from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional, Dict
from uuid import UUID
import asyncpg
import asyncio
from scipy.stats import fisher_exact
from statsmodels.stats.multitest import multipletests
import numpy as np
from cachetools import TTLCache
from fastapi.responses import StreamingResponse
import io
from dotenv import load_dotenv
import os

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", 5432)
POSTGRAPHILE_URL = "http://127.0.0.1:5000/graphql"

router = APIRouter()


class Bitmap:
    def __init__(self):
        self.columns: Dict[UUID, int] = {}
        self.columns_str: List[str] = []
        self.values: List[tuple[UUID, np.ndarray]] = []
        self.terms: Dict[UUID, List[tuple[UUID, str, str]]] = {}


class PersistentState:
    def __init__(self):
        self.bitmaps: Dict[UUID, Bitmap] = {}
        self.latest: Optional[UUID] = None
        self.cache = TTLCache(maxsize=100, ttl=30000)  # Cache with 30000 seconds TTL


persistent_state = PersistentState()


async def get_db_connection():
    return await asyncpg.connect(
        user=DB_USERNAME, password=DB_PASSWORD, database=DB_NAME, host=DB_HOST, port=int(DB_PORT)
    )


async def ensure_index(db, background_id: UUID):
    if background_id in persistent_state.bitmaps:
        return

    print(f"[{background_id}] initializing")
    bitmap = Bitmap()

    background_info = await db.fetchrow(
        """
        SELECT id, (SELECT jsonb_object_agg(g.id, g.symbol)
                    FROM jsonb_each(gene_ids) bg(gene_id, nil)
                    INNER JOIN app_public_v2.gene g ON bg.gene_id::uuid = g.id) AS genes
        FROM app_public_v2.background b
        WHERE id = $1::uuid
    """,
        str(background_id),
    )

    background_genes = dict(background_info["genes"])
    background_genes = sorted([(UUID(id), symbol) for id, symbol in background_genes.items()])

    for i, (gene_id, gene) in enumerate(background_genes):
        bitmap.columns[gene_id] = i
        bitmap.columns_str.append(gene)

    async for row in db.cursor(
        """
        SELECT id, term, COALESCE(description, '') AS description, hash, gene_ids
        FROM app_public_v2.gene_set
    """
    ):
        gene_set_id = row["id"]
        term = row["term"]
        description = row["description"]
        gene_set_hash = row["hash"]

        if gene_set_hash:
            if gene_set_hash not in bitmap.terms:
                gene_ids = [UUID(gene_id) for gene_id in row["gene_ids"].keys()]
                bitset = np.zeros(len(bitmap.columns), dtype=bool)
                for gene_id in gene_ids:
                    if gene_id in bitmap.columns:
                        bitset[bitmap.columns[gene_id]] = True
                bitmap.values.append((gene_set_hash, bitset))

            if gene_set_hash not in bitmap.terms:
                bitmap.terms[gene_set_hash] = []
            bitmap.terms[gene_set_hash].append((gene_set_id, term, description))

    persistent_state.bitmaps[background_id] = bitmap
    persistent_state.latest = background_id
    print(f"[{background_id}] initialized")


@router.get("/{background_id}")
async def ensure(background_id: str):
    db = await get_db_connection()
    try:
        background_id = UUID(background_id)
        await ensure_index(db, background_id)
        bitmap = persistent_state.bitmaps[background_id]
        return {
            "columns": len(bitmap.columns),
            "index": len(bitmap.values),
        }
    finally:
        await db.close()


@router.get("/{background_id}/gmt")
async def get_gmt(background_id: str):
    if background_id == "latest":
        background_id = persistent_state.latest
    else:
        background_id = UUID(background_id)

    if background_id not in persistent_state.bitmaps:
        raise HTTPException(status_code=404, detail="Background not found")

    bitmap = persistent_state.bitmaps[background_id]

    async def generate_gmt():
        for gene_set_hash, gene_set in bitmap.values:
            if gene_set_hash in bitmap.terms:
                for _, term, description in bitmap.terms[gene_set_hash]:
                    line = f"{term}\t{description}"
                    for col_ind, is_present in enumerate(gene_set):
                        if is_present:
                            line += f"\t{bitmap.columns_str[col_ind]}"
                    yield line + "\n"

    return StreamingResponse(generate_gmt(), media_type="text/plain")


@router.delete("/{background_id}")
async def delete(background_id: str):
    if background_id == "latest":
        background_id = persistent_state.latest
    else:
        background_id = UUID(background_id)

    if background_id not in persistent_state.bitmaps:
        raise HTTPException(status_code=404, detail="Background not found")

    del persistent_state.bitmaps[background_id]
    print(f"[{background_id}] deleted")
    return {"status": "success"}


@router.post("/{background_id}")
async def query(
    background_id: str,
    input_gene_set: List[str],
    filter_term: Optional[str] = None,
    overlap_ge: int = Query(1, ge=1),
    pvalue_le: float = Query(1.0, gt=0, le=1),
    adj_pvalue_le: float = Query(1.0, gt=0, le=1),
    offset: int = Query(0, ge=0),
    limit: Optional[int] = Query(None, ge=1),
):
    if background_id == "latest":
        background_id = persistent_state.latest
    else:
        background_id = UUID(background_id)

    if background_id not in persistent_state.bitmaps:
        raise HTTPException(status_code=404, detail="Background not found")

    bitmap = persistent_state.bitmaps[background_id]

    input_gene_set = [UUID(gene) for gene in input_gene_set]
    input_bitset = np.zeros(len(bitmap.columns), dtype=bool)
    for gene in input_gene_set:
        if gene in bitmap.columns:
            input_bitset[bitmap.columns[gene]] = True

    cache_key = (background_id, input_bitset.tobytes(), filter_term, overlap_ge, pvalue_le, adj_pvalue_le)
    if cache_key in persistent_state.cache:
        results = persistent_state.cache[cache_key]
    else:
        results = []
        n_background = len(bitmap.columns)
        n_user_gene_id = np.sum(input_bitset)

        for index, (gene_set_hash, gene_set) in enumerate(bitmap.values):
            n_overlap = np.sum(input_bitset & gene_set)
            if n_overlap < overlap_ge:
                continue

            n_gs_gene_id = np.sum(gene_set)
            a, b = n_overlap, n_user_gene_id - n_overlap
            c, d = n_gs_gene_id - n_overlap, n_background - n_user_gene_id - n_gs_gene_id + n_overlap

            _, pvalue = fisher_exact([[a, b], [c, d]], alternative="greater")
            if pvalue > pvalue_le:
                continue

            odds_ratio = (n_overlap / n_user_gene_id) / (n_gs_gene_id / n_background)
            results.append(
                {
                    "index": index,
                    "gene_set_hash": gene_set_hash,
                    "n_overlap": int(n_overlap),
                    "odds_ratio": odds_ratio,
                    "pvalue": pvalue,
                }
            )

        if results:
            pvalues = [r["pvalue"] for r in results]
            adj_pvalues = multipletests(pvalues, method="fdr_bh")[1]
            for r, adj_pvalue in zip(results, adj_pvalues):
                r["adj_pvalue"] = adj_pvalue

        results = [r for r in results if r["adj_pvalue"] <= adj_pvalue_le]
        results.sort(key=lambda x: x["pvalue"])

        persistent_state.cache[cache_key] = results

    if filter_term:
        filter_term = filter_term.lower()
        results = [
            r
            for r in results
            if any(term.lower().find(filter_term) != -1 for _, term, _ in bitmap.terms.get(r["gene_set_hash"], []))
        ]

    total_count = len(results)
    results = results[offset : offset + limit] if limit else results[offset:]

    return {
        "results": [
            {
                "gene_set_hash": str(r["gene_set_hash"]),
                "n_overlap": r["n_overlap"],
                "odds_ratio": r["odds_ratio"],
                "pvalue": r["pvalue"],
                "adj_pvalue": r["adj_pvalue"],
            }
            for r in results
        ],
        "content_range": {
            "offset": offset,
            "limit": len(results),
            "total": total_count,
        },
    }

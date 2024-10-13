from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from typing import Optional, List
import uuid
import json
from scipy import stats
import asyncpg
from database import get_db
from models import GeneSet, QueryResult, QueryResponse
from utils.bitmap import Bitmap, SparseBitVec, DenseBitVec, compute_overlap
from state import state
import requests
import os

router = APIRouter()

async def ensure_index(db: asyncpg.Connection, background_id: uuid.UUID):
    if background_id in state.bitmaps:
        return

    print(f"[{background_id}] initializing")
    bitmap = Bitmap()

    async with db.transaction():
        background_info = await db.fetchrow(
            "SELECT id, (SELECT jsonb_object_agg(g.id, g.symbol) FROM jsonb_each(gene_ids) bg(gene_id, nil) INNER JOIN app_public_v2.gene g ON bg.gene_id::uuid = g.id) AS genes FROM app_public_v2.background b WHERE id = $1::uuid;",
            str(background_id)
        )

        if not background_info:
            raise HTTPException(status_code=404, detail="Background not found")

        background_genes = json.loads(background_info['genes'])
        background_genes = sorted([(uuid.UUID(id), symbol) for id, symbol in background_genes.items()])

        state.fisher.extend_to(len(background_genes) * 4)
        bitmap.columns = {gene_id: i for i, (gene_id, _) in enumerate(background_genes)}
        bitmap.columns_str = [gene for _, gene in background_genes]

        gene_sets = await db.fetch(
            "SELECT id, term, COALESCE(description, '') AS description, hash, gene_ids FROM app_public_v2.gene_set;"
        )

        for row in gene_sets:
            gene_set_id = row['id']
            term = row['term']
            description = row['description']
            gene_set_hash = row['hash']
            gene_ids = json.loads(row['gene_ids'])

            if gene_set_hash not in bitmap.terms:
                gene_ids = [uuid.UUID(gene_id) for gene_id in gene_ids.keys()]
                bitset = SparseBitVec(bitmap.columns, gene_ids)
                bitmap.values.append((gene_set_hash, bitset))

            bitmap.terms.setdefault(gene_set_hash, []).append((gene_set_id, term, description))

    state.bitmaps[background_id] = bitmap
    state.latest = background_id
    print(f"[{background_id}] initialized")

@router.get("/{background_id}")
async def ensure(background_id: str, db: asyncpg.Connection = Depends(get_db)):
    try:
        background_id = uuid.UUID(background_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid background_id")

    await ensure_index(db, background_id)
    bitmap = state.bitmaps.get(background_id)
    if not bitmap:
        raise HTTPException(status_code=404, detail="Can't find background")

    return {
        "columns": len(bitmap.columns),
        "index": len(bitmap.values),
    }

@router.get("/{background_id}/gmt")
async def get_gmt(background_id: str, db: asyncpg.Connection = Depends(get_db)):
    try:
        if background_id == "latest":
            background_id = state.latest
            if not background_id:
                raise HTTPException(status_code=404, detail="Nothing loaded")
        else:
            background_id = uuid.UUID(background_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid background_id")

    await ensure_index(db, background_id)
    bitmap = state.bitmaps.get(background_id)
    if not bitmap:
        raise HTTPException(status_code=404, detail="Can't find background")

    async def generate():
        for gene_set_hash, gene_set in bitmap.values:
            if gene_set_hash in bitmap.terms:
                for _, term, description in bitmap.terms[gene_set_hash]:
                    line = f"{term}\t{description}"
                    for col_ind in gene_set.v:
                        line += f"\t{bitmap.columns_str[col_ind]}"
                    yield line + "\n"

    return StreamingResponse(generate(), media_type="text/plain")


@router.delete("/{background_id}")
async def delete(background_id: str):
    try:
        if background_id == "latest":
            background_id = state.latest
            if not background_id:
                raise HTTPException(status_code=404, detail="Nothing loaded")
        else:
            background_id = uuid.UUID(background_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid background_id")

    if background_id not in state.bitmaps:
        raise HTTPException(status_code=404, detail="Not Found")

    del state.bitmaps[background_id]
    print(f"[{background_id}] deleted")
    return {}


# @router.post("/enrich")
# async def enrich(data: dict):
#     background_id = data["background_id"]
#     gene_ids = data["gene_ids"]
#     filter_term = data["filter_term"]
#     overlap_ge = data["overlap_ge"]
#     pvalue_le = data["pvalue_le"]
#     adj_pvalue_le = data["adj_pvalue_le"]
#     offset = data["offset"]
#     first = data["first"]

#     enrich_url = f"{os.getenv("ENRICH_URL", "http://127.0.0.1:5328")}/{background_id}"

#     params = {
#         "overlap_ge": overlap_ge,
#         "pvalue_le": pvalue_le,
#         "adj_pvalue_le": adj_pvalue_le,
#     }
#     if filter_term:
#         params["filter_term"] = filter_term
#     if offset is not None:
#         params["offset"] = offset
#     if first is not None:
#         params["limit"] = first

#     # async with httpx.AsyncClient() as client:
#     #     response = await client.post(enrich_url, params=params, json=gene_ids)

    
#     response = requests.post(enrich_url, params=params, json=gene_ids)

#     if response.status_code != 200:
#         raise HTTPException(status_code=response.status_code, detail="Enrichment service error")

#     total_count = response.headers.get("Content-Range", "").partition("/")[-1]
#     result = response.json()

#     return {"nodes": result, "total_count": int(total_count) if total_count.isdigit() else None}

@router.post("/{background_id}")
async def query(
    background_id: str,
    input_gene_set: GeneSet,
    filter_term: Optional[str] = None,
    overlap_ge: Optional[int] = Query(1, ge=1),
    pvalue_le: Optional[float] = Query(1.0, le=1.0),
    adj_pvalue_le: Optional[float] = Query(1.0, le=1.0),
    offset: Optional[int] = Query(0, ge=0),
    limit: Optional[int] = None,
    db: asyncpg.Connection = Depends(get_db),
):
    print(f"Query received. Background ID: {background_id}")
    print(f"Input gene set size: {len(input_gene_set.genes)}")
    print(f"Filter params: overlap_ge={overlap_ge}, pvalue_le={pvalue_le}, adj_pvalue_le={adj_pvalue_le}")

    try:
        if background_id == "latest":
            background_id = state.latest
            if not background_id:
                raise HTTPException(status_code=404, detail="Nothing loaded")
        else:
            background_id = uuid.UUID(background_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid background_id")

    await ensure_index(db, background_id)
    bitmap = state.bitmaps.get(background_id)
    if not bitmap:
        raise HTTPException(status_code=404, detail="Can't find background")

    # Look up gene IDs from the database based on symbols
    gene_symbols = input_gene_set.genes
    gene_ids = await db.fetch(
        "SELECT id FROM app_public_v2.gene WHERE symbol = ANY($1::text[])",
        gene_symbols
    )
    # input_gene_set_uuids = [uuid.UUID(row['id']) for row in gene_ids]
    input_gene_set_uuids = [row['id'] for row in gene_ids]  # No need for UUID conversion
    
    print(f"Number of genes found in database: {len(input_gene_set_uuids)}")
    print(f"Sample input UUIDs: {input_gene_set_uuids[:5]}")
    
    input_gene_set = DenseBitVec(bitmap.columns, input_gene_set_uuids)
    print(f"Processed input gene set size: {input_gene_set.n}")
    print(f"Number of columns in bitmap: {len(bitmap.columns)}")
    print(f"Sample bitmap columns: {list(bitmap.columns.items())[:5]}")

    filter_term = filter_term.lower() if filter_term else None

    cache_key = (background_id, tuple(input_gene_set.v), input_gene_set.n)
    if cache_key in state.cache:
        results = state.cache[cache_key]
    else:
        n_background = len(bitmap.columns)
        n_user_gene_id = input_gene_set.n

        results = []
        for index, (gene_set_hash, gene_set) in enumerate(bitmap.values):
            n_overlap = compute_overlap(input_gene_set, gene_set)
            if n_overlap < overlap_ge:
                continue

            n_gs_gene_id = len(gene_set.v)
            a = n_overlap
            b = n_user_gene_id - n_overlap
            c = n_gs_gene_id - n_overlap
            d = n_background - (a + b + c)
            pvalue = state.fisher.get_p_value(a, b, c, d)

            if pvalue > pvalue_le:
                continue

            odds_ratio = (n_overlap / n_user_gene_id) / (n_gs_gene_id / n_background)
            results.append(
                {
                    "index": index,
                    "n_overlap": n_overlap,
                    "odds_ratio": odds_ratio,
                    "pvalue": pvalue,
                    "adj_pvalue": 1.0,  # Will be updated later
                }
            )

        print(f"Number of results before adjustment: {len(results)}")

        # Compute adjusted p-values
        pvalues = [result["pvalue"] for result in results]
        adj_pvalues = stats.false_discovery_control(pvalues)
        for result, adj_pvalue in zip(results, adj_pvalues):
            result["adj_pvalue"] = adj_pvalue

        results = [result for result in results if result["adj_pvalue"] <= adj_pvalue_le]
        results.sort(key=lambda x: x["pvalue"])

        state.cache[cache_key] = results

    # Apply filter_term and prepare final results
    final_results = []
    for result in results:
        gene_set_hash, _ = bitmap.values[result["index"]]
        if filter_term:
            if not any(term.lower().find(filter_term) != -1 for _, term, _ in bitmap.terms.get(gene_set_hash, [])):
                continue
        final_results.append(
            QueryResult(
                gene_set_hash=str(gene_set_hash),
                n_overlap=result["n_overlap"],
                odds_ratio=result["odds_ratio"],
                pvalue=result["pvalue"],
                adj_pvalue=result["adj_pvalue"],
            )
        )

    # Apply offset and limit
    range_total = len(final_results)
    range_start = offset
    range_end = min(range_total, offset + (limit or range_total))
    final_results = final_results[range_start:range_end]

    print(f"Number of final results: {len(final_results)}")

    return QueryResponse(results=final_results, content_range=(range_start, range_end, range_total))
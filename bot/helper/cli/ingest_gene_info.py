import urllib.request
from tqdm import tqdm
from pathlib import Path
from helper.cli import cli
from helper.utils import copy_from_records
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()


def ensure_gene_info(organism="Archaea_Bacteria/Bacteria"):
    gene_info_path = Path(f"{organism}.gene_info.gz")
    if not gene_info_path.exists():
        gene_info_path.parent.mkdir(exist_ok=True, parents=True)
        urllib.request.urlretrieve(
            f"https://ftp.ncbi.nlm.nih.gov/gene/DATA/GENE_INFO/{organism}.gene_info.gz", gene_info_path
        )
    return gene_info_path


def try_fetch_json(url, tries=1):
    import time
    import json
    import traceback

    time.sleep(0.5)
    for _ in range(tries):
        try:
            with urllib.request.urlopen(url) as fr:
                return json.load(fr)
        except KeyboardInterrupt:
            raise
        except:
            traceback.print_exc()
            time.sleep(5)


def ensure_gene_summary(chunk_size=100, species=208964):
    # Primary credit to https://www.biostars.org/p/2144/
    # I modified it to:
    #  1. work with python3
    #  2. use the ncbi ftp gene_info file as input
    #  3. try again if API returns an error
    import numpy as np
    import pandas as pd

    gene_summary_path = Path("data/pathogenelit.gene_summary.tsv")
    gene_info = pd.read_csv(ensure_gene_info(), sep="\t", compression="gzip")
    gene_info = gene_info[gene_info["#tax_id"] == species]
    gene_ids = gene_info["GeneID"].unique()
    if gene_summary_path.exists():
        results = pd.read_csv(gene_summary_path, sep="\t")
        gene_ids = np.setdiff1d(gene_ids, results["GeneID"].unique())
    #
    for i in tqdm(range(0, len(gene_ids), chunk_size), desc="Fetching gene summaries..."):
        chunk_genes = gene_ids[i : min(i + chunk_size, len(gene_ids))]
        gids = ",".join([str(s) for s in chunk_genes])
        url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id={gids}&retmode=json"
        data = try_fetch_json(url, 3)
        result = []
        # here, we pull the `description` rather than the `summary`
        # because bacterial genes don't have summaries
        for g in chunk_genes:
            result.append([g, data["result"][str(g)]["description"] if str(g) in data["result"] else ""])
        pd.DataFrame(result, columns=["GeneID", "description"]).to_csv(
            gene_summary_path, index=False, mode="a", sep="\t", header=(i == 0)
        )
    return gene_summary_path


def ensure_gene_info_complete(species=208964):
    gene_info_complete_path = Path("data/pathogenelit.gene_info.complete.tsv")
    if not gene_info_complete_path.exists():
        import pandas as pd

        # We are not merging on summaries because bacterial genes don't have
        # summaries -> just the GeneID and description will be used
        df = pd.read_csv(ensure_gene_info(), sep="\t", compression="gzip")
        df = df[df["#tax_id"] == species]
        # df_summary = pd.read_csv(ensure_gene_summary(), sep="\t")
        df = df.dropna(subset=["GeneID"])
        df["GeneID"] = df["GeneID"].astype(str)
        # df_summary = df_summary.dropna(subset=["GeneID"])
        # df_summary["GeneID"] = df_summary["GeneID"].astype(str)
        # df_out = pd.merge(
        #     left=df,
        #     left_on="GeneID",
        #     right=df_summary,
        #     right_on="GeneID",
        #     how="left",
        # )
        # df_out.to_csv(gene_info_complete_path, sep="\t", index=False)
        df.to_csv(gene_info_complete_path, sep="\t", index=False)
    #
    return gene_info_complete_path


def import_gene_info(conn, species=208964):
    import pandas as pd
    import json

    df = pd.read_csv(ensure_gene_info_complete(), sep="\t")
    symbols = set(df["Symbol"].unique())
    with conn.cursor() as cursor:
        cursor.execute(
            """
            SELECT symbol
            FROM app_public_v2.gene
            WHERE description IS NULL
        """
        )
        genes_without_info = [row[0] for row in cursor.fetchall() if row[0] in symbols]

    df = (
        df.drop_duplicates(subset="Symbol")
        .set_index("Symbol")
        .loc[genes_without_info, ["GeneID", "LocusTag", "description"]]
    )

    if df.shape[0] > 0:
        copy_from_records(
            conn,
            "app_public_v2.gene",
            ("symbol", "synonyms", "ncbi_gene_id", "description"),
            tqdm(
                (
                    dict(
                        symbol=symbol,
                        synonyms=json.dumps({row["LocusTag"]: symbol}),
                        ncbi_gene_id=row["GeneID"],
                        description=row["description"],
                    )
                    for symbol, row in df.iterrows()
                ),
                total=df.shape[0],
                desc="Inserting gene info",
            ),
            on_conflict_update=("symbol",),
        )


@cli.command()
def ingest_gene_info():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    try:
        import_gene_info(conn)
    except:
        conn.rollback()
        raise
    else:
        conn.commit()
    finally:
        conn.close()

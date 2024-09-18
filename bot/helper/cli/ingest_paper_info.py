import traceback
from tqdm import tqdm
from helper.cli import cli
from helper.utils import copy_from_records
import psycopg2
import os
from dotenv import load_dotenv
import pandas as pd
import requests
import re

load_dotenv()


def chunked_iterable(iterable, chunk_size):
    for i in range(0, len(iterable), chunk_size):
        yield iterable[i : min(i + chunk_size, len(iterable))]


def import_paper_info(conn):
    with conn.cursor() as cursor:
        cursor.execute(
            """
            SELECT pmc
            FROM app_public_v2.pmc
            WHERE pmc NOT IN (
                SELECT pmcid
                FROM app_public_v2.pmc_info
            );
        """
        )
        to_ingest = [row[0] for row in cursor.fetchall()]

    if not to_ingest:
        return

    pmc_meta = pd.read_csv(
        "https://ftp.ncbi.nlm.nih.gov/pub/pmc/PMC-ids.csv.gz",
        usecols=["PMCID", "Year", "DOI"],
        index_col="PMCID",
        compression="gzip",
    )
    pmc_meta = pmc_meta.loc[to_ingest]

    title_dict = {}
    for i in tqdm(range(0, len(to_ingest), 250), "Pulling titles..."):
        while True:
            j = 0
            try:
                ids_string = ",".join([re.sub(r"^PMC(\d+)$", r"\1", id) for id in to_ingest[i : i + 250]])
                res = requests.get(
                    f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&retmode=json&id={ids_string}"
                )
                ids_info = res.json()
                for id in ids_info["result"]["uids"]:
                    try:
                        title_dict[f"PMC{id}"] = ids_info["result"][id]["title"]
                    except KeyError:
                        pass
                break
            except KeyboardInterrupt:
                raise
            except Exception as e:
                traceback.print_exc()
                print("Error resolving info. Retrying...")
                j += 1
                if j >= 10:
                    raise RuntimeError(f"Error connecting to E-utilites api...")

    if title_dict:
        copy_from_records(
            conn,
            "app_public_v2.pmc_info",
            ("pmcid", "yr", "doi", "title"),
            tqdm(
                (
                    dict(
                        pmcid=pmc,
                        yr=int(pmc_meta.loc[pmc, "Year"]),
                        doi=pmc_meta.loc[pmc, "DOI"],
                        title=title_dict.get(pmc),
                    )
                    for pmc in pmc_meta.index.values
                    if pmc in title_dict
                ),
                total=len(title_dict),
                desc="Inserting PMC info..",
            ),
        )


@cli.command()
def ingest_paper_info():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    try:
        import_paper_info(conn)
    except:
        conn.rollback()
        raise
    else:
        conn.commit()
    finally:
        conn.close()

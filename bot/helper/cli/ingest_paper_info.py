import traceback
from tqdm import tqdm
from helper.cli import cli
from helper.utils import copy_from_records
import psycopg2.extras as extras


def import_paper_info(conn):
    # Find subset to add info to
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

    # Use information from bulk download metadata table
    if not to_ingest:
        return

    pmc_meta = pd.read_csv(
        "https://ftp.ncbi.nlm.nih.gov/pub/pmc/PMC-ids.csv.gz",
        usecols=["PMCID", "Year", "DOI"],
        index_col="PMCID",
        compression="gzip",
    )
    pmc_meta = pmc_meta.loc[to_ingest]

    # Prepare title dictionary
    title_dict = {}
    for chunk in extras.chunked_iterable(to_ingest, 250):
        ids_string = ",".join([re.sub(r"^PMC(\d+)$", r"\1", id) for id in chunk])
        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    f"""
                    SELECT pmc AS id, title
                    FROM pmc_info
                    WHERE pmc IN ({ids_string})
                """,
                    {"pmc_info": pmc_meta},
                )
                for row in cursor.fetchall():
                    title_dict[row[0]] = row[1]
        except Exception as e:
            traceback.print_exc()
            print("Error resolving info. Retrying...")
            continue

    # Insert paper info
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
                ),
                total=len(title_dict),
                desc="Inserting PMC info..",
            ),
        )


@cli.command()
def ingest_paper_info():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])  # Assuming you have a connection string in environment variable
    try:
        import_paper_info(conn)
    except:
        conn.rollback()
        raise
    else:
        conn.commit()
    finally:
        conn.close()  # Ensure connection is closed

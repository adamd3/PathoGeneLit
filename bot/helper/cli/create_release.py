import click
from helper.cli import cli
from dotenv import load_dotenv
import os

load_dotenv()


@cli.command()
@click.argument("publications", type=int)
def create_release(publications):
    import psycopg2

    with psycopg2.connect(os.environ["DATABASE_URL"]) as conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO app_public_v2.release (n_publications_processed) VALUES (%s)", (publications,))
            cur.execute("REFRESH MATERIALIZED VIEW app_private_v2.pmc_stats")
            conn.commit()

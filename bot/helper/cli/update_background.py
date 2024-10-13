import click
from helper.cli import cli
from dotenv import load_dotenv
import os

load_dotenv()

ENRICH_URL = os.getenv("ENRICH_URL", "http://127.0.0.1:5328")

@cli.command()
@click.option("--enrich-url", envvar="ENRICH_URL", default=ENRICH_URL)
def update_background(enrich_url):
    """A background is tied to a complete set of genes across all gene sets
    but also to a computed index in the enrich API. This function creates a
    new one, and drops the old one after ensuring the index is ready.
    """
    import psycopg2
    import requests

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cursor = conn.cursor()

    try:
        # Step 1: Record current backgrounds
        cursor.execute("SELECT id FROM app_public_v2.background")
        current_backgrounds = [row[0] for row in cursor.fetchall()]

        # Step 2: Create updated background
        cursor.execute(
            """
            insert into app_public_v2.background (gene_ids, n_gene_ids)
            select
                jsonb_object_agg(distinct gsg.key, null) as gene_ids,
                count(distinct gsg.key) as n_gene_ids
            from app_public_v2.gene_set gs, jsonb_each(gs.gene_ids) gsg(key, value)
            returning id;
        """
        )
        new_background = cursor.fetchone()[0]
        conn.commit()

        ## Trigger index creation for the new background via API
        response = requests.get(f"{enrich_url}/{new_background}")
        assert response.ok, "Failed to trigger index creation for new background"

        # Remove old backgrounds from the database
        cursor.execute("DELETE FROM app_public_v2.background WHERE id = ANY(%s::uuid[])", (current_backgrounds,))
        conn.commit()

        for current_background in current_backgrounds:
            requests.delete(f"{enrich_url}/{current_background}")

    except Exception as e:
        conn.rollback()
        raise e

    finally:
        cursor.close()
        conn.close()
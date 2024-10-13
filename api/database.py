from dotenv import load_dotenv
import os
import asyncpg
from fastapi import Depends
from typing import AsyncGenerator
from asyncpg import create_pool, Pool

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", 5432)
POSTGRAPHILE_URL = "http://127.0.0.1:5000/graphql"

DATABASE_URL = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

async def get_db_pool() -> Pool:
    return await create_pool(DATABASE_URL)

async def get_db():
    pool = await get_db_pool()
    async with pool.acquire() as connection:
        yield connection
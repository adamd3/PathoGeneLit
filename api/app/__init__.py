from fastapi import FastAPI
from app.routes import api_routes


def app() -> FastAPI:
    app = FastAPI()

    app.include_router(api_routes.router)

    return app

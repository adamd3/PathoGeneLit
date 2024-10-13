from fastapi import FastAPI
import enrichment
from state import state

app = FastAPI()

app.include_router(enrichment.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=5328)

from fastapi import APIRouter

router = APIRouter()


@router.get("/api/python")
async def hello_world():
    return {"message": "Hello, World!"}

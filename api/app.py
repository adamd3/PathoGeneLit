import uvicorn
from app import app
from dotenv import load_dotenv

load_dotenv()

app = app()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5328)

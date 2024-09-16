import uvicorn
from index import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5328, reload=True)

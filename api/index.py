from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

from flask import Blueprint
from .api_routes import hello_world

api_bp = Blueprint("api", __name__)

api_bp.route("/python")(hello_world)

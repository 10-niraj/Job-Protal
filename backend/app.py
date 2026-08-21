from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from database.db import db
from models.user_model import User
from models.job_model import Job
from routes.user_routes import user_bp
from routes.job_routes import job_bp


app = Flask(__name__)

app.config.from_object(Config)

CORS(app, origins=[
    "http://localhost:5173",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5175"
])

db.init_app(app)

app.register_blueprint(user_bp)
app.register_blueprint(job_bp)

with app.app_context():
    db.create_all()

@app.route("/", methods=["GET"])
def home():
    return jsonify({ "message": "Job Profile API Running Successfully" }), 200

if __name__ == "__main__":
    app.run(debug=True)
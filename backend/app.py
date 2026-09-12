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
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:////tmp/jobportal.db'

CORS(app)
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
import re
from flask import request, jsonify
from database.db import db
from models.user_model import User


def validate_user(data):

    fields = ["name","email","contactNo","city","education","jobprofile"]

    for field in fields:
        if field not in data or not str(data[field]).strip():
            return f"{field} is required"


    if len(str(data["name"]).strip()) < 3:
        return "Name must contain at least 3 characters"

    email = str(data["email"]).strip()
    if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email):
        return "Invalid email"

    contact = str(data["contactNo"]).strip()
    if not contact.isdigit() or len(contact) != 10:
        return "Contact number must be exactly 10 digits"

    return None

def get_users():
    users = User.query.all()
    return jsonify({ "message": "Users fetched successfully",
        "users": [user.to_dict() for user in users] }), 200

def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({ "message": "User not found" }), 404
    
    return jsonify({ "message": "User fetched successfully",
        "user": user.to_dict() }), 200

def add_user():
    data = request.get_json()
    if not data:
        return jsonify({ "message": "Request body is required" }), 400
    error = validate_user(data)
    
    if error:
        return jsonify({ "message": error }), 400

    email = str(data["email"]).strip()
    existing = User.query.filter_by(email=email).first()

    if existing:
        return jsonify({ "message": "Email already exists" }), 409


    user = User(
        name=str(data["name"]).strip(),
        email=email,
        contactNo=str(data["contactNo"]).strip(),
        city=str(data["city"]).strip(),
        education=str(data["education"]).strip(),
        jobprofile=str(data["jobprofile"]).strip()
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({ "message": "User added successfully",
     "user": user.to_dict() }), 201

def update_user(user_id):
    user = User.query.get(user_id)
    
    if not user:

        return jsonify({ "message": "User not found" }), 404

    data = request.get_json()
    error = validate_user(data)

    if error:
        return jsonify({ "message": error }), 400

    email = str(data["email"]).strip()
    existing = User.query.filter(
        User.email == email,
        User.id != user_id
    ).first()

    if existing:
        return jsonify({ "message": "Email already exists" }), 409

    user.name = str(data["name"]).strip()
    user.email = email
    user.contactNo = str(data["contactNo"]).strip()
    user.city = str(data["city"]).strip()
    user.education = str(data["education"]).strip()
    user.jobprofile = str(data["jobprofile"]).strip()

    db.session.commit()

    return jsonify({ "message": "User updated successfully",
        "user": user.to_dict() }), 200

def delete_user(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({ "message": "User not found" }), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({ "message": "User deleted successfully" }), 200
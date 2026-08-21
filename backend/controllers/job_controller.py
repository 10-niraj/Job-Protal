from flask import request, jsonify
from database.db import db
from models.job_model import Job


ALLOWED_JOB_TYPES = [ "Government","Private"]


def validate_job(data):

    fields = ["companyName","timing","city","salary","job","jobType"]

    for field in fields:
        if field not in data or not str(data[field]).strip():
            return f"{field} is required"


    if len(str(data["companyName"]).strip()) < 2:
        return "Company name must contain at least 2 characters"


    if not str(data["salary"]).strip().isdigit():
        return "Salary must contain numbers only"

    job_type = str(data["jobType"]).strip()
    if job_type not in ALLOWED_JOB_TYPES:
        return "Job type must be Government or Private"

    return None


def get_jobs():
    jobs = Job.query.all()

    return jsonify({ "message": "Jobs fetched successfully",
        "jobs": [job.to_dict() for job in jobs] }), 200

def get_job(job_id):
    job = Job.query.get(job_id)

    if not job:
        return jsonify({ "message": "Job not found" }), 404


    return jsonify({ "message": "Job fetched successfully",
        "job": job.to_dict() }), 200

def add_job():
    data = request.get_json()

    if not data:
        return jsonify({ "message": "Request body is required" }), 400

    error = validate_job(data)

    if error:
        return jsonify({ "message": error }), 400

    job = Job(
        companyName=str(data["companyName"]).strip(),
        timing=str(data["timing"]).strip(),
        city=str(data["city"]).strip(),
        salary=str(data["salary"]).strip(),
        job=str(data["job"]).strip(),
        jobType=str(data["jobType"]).strip()
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({ "message": "Job added successfully",
        "job": job.to_dict() }), 201

def update_job(job_id):
    job = Job.query.get(job_id)

    if not job:
        return jsonify({ "message": "Job not found" }), 404


    data = request.get_json()
    error = validate_job(data)

    if error:
        return jsonify({ "message": error }), 400


    job.companyName = str(data["companyName"]).strip()
    job.timing = str(data["timing"]).strip()
    job.city = str(data["city"]).strip()
    job.salary = str(data["salary"]).strip()
    job.job = str(data["job"]).strip()
    job.jobType = str(data["jobType"]).strip()

    db.session.commit()
    
    return jsonify({ "message": "Job updated successfully",
        "job": job.to_dict() }), 200

def delete_job(job_id):
    job = Job.query.get(job_id)

    if not job:
        return jsonify({ "message": "Job not found" }), 404


    db.session.delete(job)
    db.session.commit()

    return jsonify({ "message": "Job deleted successfully" }), 200
from flask import Blueprint
from controllers.job_controller import ( get_jobs,get_job,add_job,update_job,delete_job )

job_bp = Blueprint( "job_bp", __name__, url_prefix="/api/jobs" )

@job_bp.route("", methods=["GET"])
def jobs_get():
    return get_jobs()

@job_bp.route("/<int:job_id>", methods=["GET"])
def job_get(job_id):
   return get_job(job_id)

@job_bp.route("", methods=["POST"])
def jobs_add():
    return add_job()

@job_bp.route("/<int:job_id>", methods=["PUT"])
def jobs_update(job_id):
    return update_job(job_id)

@job_bp.route("/<int:job_id>", methods=["DELETE"])
def jobs_delete(job_id):
    return delete_job(job_id)

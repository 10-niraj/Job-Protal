from flask import Blueprint
from controllers.user_controller import ( get_users, get_user, add_user, update_user, delete_user )

user_bp = Blueprint( "user_bp", __name__, url_prefix="/api/users" )

@user_bp.route("", methods=["GET"])
def users_get():
    return get_users()

@user_bp.route("", methods=["POST"])
def users_add():
    return add_user()

@user_bp.route("/<int:user_id>", methods=["GET"])
def user_get(user_id):
    return get_user(user_id)

@user_bp.route("/<int:user_id>", methods=["PUT"])
def user_update(user_id):
    return update_user(user_id)

@user_bp.route("/<int:user_id>", methods=["DELETE"])
def user_delete(user_id):
    return delete_user(user_id)


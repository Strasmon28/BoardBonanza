from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, List
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)

# Read all the lists of a board
@list_routes.route("/all")
def all_lists():
    # Return all the lists that are included in the board
    lists = [lists.to_dict() for list in List.query.filter(List.board_id)]
    return {"lists": lists}

# Create a new list
@list_routes.route("/new", methods=['POST'])
def new_list():
    form = ListForm()

    if form.validate_on_submit():
        list = List(
            board_id=form.data['board_id'],
            title=form.data['title'],
            cover=form.data['cover']
        )

        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    else:
        return {'errors': form.errors}


# Update an existing list
@list_routes.route("/update/<int:id>", methods=['PUT'])
def update_one_list(id):
    form = ListForm()

    if form.validate_on_submit():
        updated_list = List.query.get(id)

        updated_list.title=form.data['title']
        updated_list.cover=form.data['cover']

        db.session.commit()

        return updated_list.to_dict()

    else:
        return {'errors': form.errors}

# Delete a list
@list_routes.route("/delete/<int:id>", methods=['DELETE'])
def delete_one_list(id):
    deleted_list = List.query.get(id)
    if deleted_list:
        db.session.delete(deleted_list)
        db.session.commit()
        return "Board successfully deleted"
    else:
        return {"message": "Board not Found"}, 404

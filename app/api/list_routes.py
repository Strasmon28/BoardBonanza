from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, List, Board
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)

# Read all the lists of a board
@list_routes.route("/all/<int:id>")
def all_lists(id):
    # Return all the lists that are included in the board
    lists = [list.to_dict() for list in List.query.filter(List.board_id == id)]
    return {"lists": lists}

# Create a new list
@list_routes.route("/new/<int:boardId>", methods=['POST'])
def new_list(boardId):
    form = ListForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list = List(
            board_id=boardId,
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

    form['csrf_token'].data = request.cookies['csrf_token']
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

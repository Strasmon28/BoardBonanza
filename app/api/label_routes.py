from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Label
from app.forms import LabelForm

label_routes = Blueprint('labels', __name__)

# Read all the labels that belongs to a specific board
# (Returns all the labels of the currently viewed board, then filter them in frontend)
@label_routes.route("/all/<int:id>")
def all_labels(id):
    # Return all the labels
    labels = Label.query.all()
    labels = [label.to_dict() for label in Label.query.filter(Label.board_id == id)]
    return {"labels": labels}
    # return labels.to_dict()

# Create a new label
@label_routes.route("/new/<int:listId>", methods=['POST'])
def new_label(listId):
    form = LabelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        label = Label(
            board_id=form.data['board_id'],
            list_id=listId,
            color=form.data['color'],
            comment=form.data['comment']
        )

        db.session.add(label)
        db.session.commit()
        return label.to_dict()
    else:
        return {'errors': form.errors}


# Update an existing label
@label_routes.route("/update/<int:id>", methods=['PUT'])
def update_one_label(id):
    form = LabelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updated_label = Label.query.get(id)
        updated_label.board_id=form.data['board_id']
        updated_label.color=form.data['color']
        updated_label.comment=form.data['comment']

        db.session.commit()

        return updated_label.to_dict()

    else:
        return {'errors': form.errors}

# Delete a label
@label_routes.route("/delete/<int:id>", methods=['DELETE'])
def delete_one_label(id):
    deleted_label = Label.query.get(id)
    if deleted_label:
        db.session.delete(deleted_label)
        db.session.commit()
        return "label successfully deleted"
    else:
        return {"message": "label not Found"}, 404

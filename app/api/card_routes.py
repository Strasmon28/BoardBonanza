from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Card
from app.forms import CardForm

card_routes = Blueprint('cards', __name__)

# Read all the cards of a list
@card_routes.route("/all/<int:id>")
def all_cards(id):
    # Return all the cards that are included in the list
    cards = [card.to_dict() for card in Card.query.filter(Card.board_id == id)]
    return {"cards": cards}

# Create a new card
@card_routes.route("/new/<int:boardId>", methods=['POST'])
def new_card(boardId):
    form = CardForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        card = Card(
            board_id=boardId,
            title=form.data['title'],
            cover=form.data['cover']
        )

        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    else:
        return {'errors': form.errors}


# Update an existing card
@card_routes.route("/update/<int:id>", methods=['PUT'])
def update_one_card(id):
    form = CardForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updated_card = Card.query.get(id)

        updated_card.title=form.data['title']
        updated_card.cover=form.data['cover']

        db.session.commit()

        return updated_card.to_dict()

    else:
        return {'errors': form.errors}

# Delete a card
@card_routes.route("/delete/<int:id>", methods=['DELETE'])
def delete_one_card(id):
    deleted_card = Card.query.get(id)
    if deleted_card:
        db.session.delete(deleted_card)
        db.session.commit()
        return "Board successfully deleted"
    else:
        return {"message": "Board not Found"}, 404

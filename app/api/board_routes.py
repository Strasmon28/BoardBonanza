from flask import Blueprint, jsonify, request
from app.models import db, Board
from app.forms import BoardForm
from flask_login import current_user

# Initialize blueprint for __init__
board_routes = Blueprint("boards", __name__)

# !!! This application does not show every single board in the database
# !!! Only all the boards of a user
# Read all boards of a user
@board_routes.route('/all')
def all_boards():
    boards = [board.to_dict() for board in Board.query.filter(Board.user_id == current_user.id)]
    return {'boards': boards}

# Get one board by id
@board_routes.route('/<int:id>')
def one_board(id):
    board = Board.query.get(id)
    return board.to_dict()

# Create a new board
@board_routes.route('/new', methods=['POST'])
def new_board():
    form = BoardForm()
    # print("****** currentuser", current_user)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        board = Board(
            user_id=current_user.id,
            title=form.data['title'],
            theme=form.data['theme']
        )
        db.session.add(board)
        db.session.commit()
        return board.to_dict()
    else:
        return {'errors': form.errors}

#Update a board
@board_routes.route('/update/<int:id>', methods=['PUT'])
def update_one_board(id):
    form = BoardForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updated_board = Board.query.get(id)

        updated_board.title=form.data['title']
        updated_board.theme=form.data['theme']

        db.session.commit()

        return updated_board.to_dict()

    else:
        return {'errors': form.errors}

@board_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_board(id):
    deleted_board = Board.query.get(id)
    if deleted_board:
        db.session.delete(deleted_board)
        db.session.commit()
        return "Board successfully deleted"
    else:
        return {"message": "Board not Found"}, 404

from flask import Blueprint, jsonify
from app.models import db, Board
# from flask_login import current_user

# Initialize blueprint for __init__
board_routes = Blueprint("boards", __name__)

# !!! This application does not show every single board in the database
# !!! Only all the boards of a user
# Read all boards of a user
@board_routes.route('/')
def allBoards():
    boards = [board.to_dict() for board in Board.query.all()]
    return {'boards': boards}

# Get one board by id
@board_routes.route('/<int:id>')
def oneBoard(id):
    board = Board.query.get(id)
    return board.to_dict()

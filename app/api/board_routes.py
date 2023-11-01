from flask import Blueprint, jsonify
from app.models import db, Board

board_routes = Blueprint("boards", __name__)

# Read all boards
board_routes.route('/')
def allBoards():
    boards = [board.to_dict() for board in Board.query.all()]
    return {'boards': boards}

# Get one board by id
board_routes.route('/<int:id>')
def oneBoard(id):
    board = Board.query.get(id)
    return board.to_dict()

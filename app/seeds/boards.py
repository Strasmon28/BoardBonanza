from app.models.board import db, Board, environment, SCHEMA
from sqlalchemy.sql import text
# from faker import Faker

def seed_boards():

    board1 = Board(user_id=1, title='Fresh Board', theme='orange')
    board2 = Board(user_id=1, title='Additional Board', theme='grass')
    board3 = Board(user_id=2, title='Incredibly Fresh', theme='storm')
    board4 = Board(user_id=2, title='Grocery Board', theme='grass')
    board5 = Board(user_id=1, title='Greatest Indie Game', theme='orange')
    board6 = Board(user_id=2, title='Boarded up', theme='storm')
    board7 = Board(user_id=2, title='I am board', theme='storm')

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.add(board6)
    db.session.add(board7)
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

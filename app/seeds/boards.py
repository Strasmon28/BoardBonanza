from app.models.board import db, Board, environment, SCHEMA
from sqlalchemy.sql import text
# from faker import Faker

def seed_boards():

    board1 = Board(user_id=1, title='Fresh Board', theme='orange')
    board2 = Board(user_id=1, title='Additional Board', theme='grass')
    board3 = Board(user_id=2, title='Incredibly Fresh', theme='storm')

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

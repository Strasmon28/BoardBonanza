from app.models.board import db, Board, environment, SCHEMA
from sqlalchemy.sql import text
# from faker import Faker

def seed_lists():

    list1 = Board(user_id=1, title='Fresh Board', theme='orange',)
    list2 = Board(user_id=1, title='Additional Board', theme='blue')
    list3 = Board(user_id=2, title='Incredibly Fresh', theme='storm')

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()

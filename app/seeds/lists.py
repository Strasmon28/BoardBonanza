from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text
# from faker import Faker

def seed_lists():

    list1 = List(board_id=1, title='Freshest List', cover='flower')
    list2 = List(board_id=1, title='Additional list', cover='starry')
    list3 = List(board_id=2, title='Super Fresh', cover='stormy')

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()

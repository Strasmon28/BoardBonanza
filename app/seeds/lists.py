from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text
# from faker import Faker

def seed_lists():

    list1 = List(board_id=1, title='Freshest List', cover='flower')
    list2 = List(board_id=1, title='Additional list', cover='starry')
    list3 = List(board_id=2, title='Super Fresh', cover='stormy')
    list4 = List(board_id=2, title='Phase 2', cover='starry')
    list5 = List(board_id=2, title='Quick List', cover='flower')
    list6 = List(board_id=1, title='Planning it out', cover='flower')
    list7 = List(board_id=1, title='Bug list', cover='starry')
    list8 = List(board_id=1, title='Test list', cover='starry')


    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.add(list7)
    db.session.add(list8)
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()

from app.models import db, Label, environment, SCHEMA
from sqlalchemy.sql import text
# from faker import Faker

def seed_labels():

    label1 = Label(board_id=1, card_id=2, color="red", comment='Freshest Label')
    label2 = Label(board_id=1, card_id=1, color="yellow", comment='Additional label')
    label3 = Label(board_id=2, card_id=3, color="green", comment='Super Fresh')
    label4 = Label(board_id=2, card_id=5, color="yellow", comment='Phase 2')
    label5 = Label(board_id=2, card_id=3, color="green", comment='Quick Label')
    label6 = Label(board_id=1, card_id=4, color="red", comment='Planning it out')
    label7 = Label(board_id=1, card_id=2, color="green", comment='Bug label')
    label8 = Label(board_id=1, card_id=2, color="red", comment='Test label')


    db.session.add(label1)
    db.session.add(label2)
    db.session.add(label3)
    db.session.add(label4)
    db.session.add(label5)
    db.session.add(label6)
    db.session.add(label7)
    db.session.add(label8)
    db.session.commit()


def undo_labels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.labels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM labels"))

    db.session.commit()

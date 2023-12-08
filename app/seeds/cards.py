from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards():
    card1 = Card(board_id=1, list_id=3, title="Fresh new card", description="Really almost done")
    card2 = Card(board_id=1, list_id=2, title="Freshest Card", description="Still needs work")
    card3 = Card(board_id=1, list_id=2, title="Newly Card", description="Almost ready")
    card4 = Card(board_id=2, list_id=5, title="Cool one", description="Needs rework")
    card5 = Card(board_id=2, list_id=6, title="New Task", description="Rework this one")

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()

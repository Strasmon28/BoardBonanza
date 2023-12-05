from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy import DateTime
from sqlalchemy.sql import func

class Label(db.Model):
    __tablename__ = 'labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), nullable=False) # ForeignKey
    color = db.Column(db.String(50), nullable=False)
    comment = db.Column(db.String(200), nullable=True)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationship
    # Many labels belong to one card
    card = db.relationship("Card", back_populates="labels")

    # One card can have many labels
    # card = db.relationship("Label", back_populates="labels", cascade="all, delete, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'board_id': self.board_id,
            'card_id': self.card_id,
            'color': self.color,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

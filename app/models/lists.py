from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy import DateTime
from sqlalchemy.sql import func

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True) # Relationship needed
    board_id = db.Column(db.Integer, nullable=False) # Relationship needed
    title = db.Column(db.String(50), nullable=False)
    cover = db.Column(db.String(30), nullable=False)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationships
    # Many lists belong to one board
    # One list has many cards

    def to_dict(self):
        return {
            'id': self.id,
            'board_id': self.board_id,
            'title': self.title,
            'cover': self.cover,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

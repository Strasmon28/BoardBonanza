from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy import DateTime
from sqlalchemy.sql import func

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True) # Needs foreign key
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    theme = db.Column(db.String(30), nullable=False)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())

    # Relationships

    # Many boards belong to one User
    # One board can have many lists

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'theme': self.theme,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

# from .db import db, environment, SCHEMA, add_prefix_for_prod

# from sqlalchemy import DateTime
# from sqlalchemy.sql import func

# class Card(db.Model):
#     __tablename__ = 'cards'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False) # ForeignKey
#     title = db.Column(db.String(50), nullable=False)
#     description = db.Column(db.String(200), nullable=True)
#     created_at = db.Column(DateTime, default=func.now())
#     updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())

#     # Relationship
#     # Many cards belong to one list
#     list = db.relationship("List", back_populates="cards")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'list_id': self.list_id,
#             'title': self.title,
#             'description': self.description,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#         }

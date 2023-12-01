from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError

class CardForm(FlaskForm):
    board_id = IntegerField("board_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])

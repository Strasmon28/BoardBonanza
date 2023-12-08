from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError

class LabelForm(FlaskForm):
    board_id = IntegerField("board_id", validators=[DataRequired()])
    color = StringField("color", validators=[DataRequired()])
    comment = StringField("comment", validators=[DataRequired()])

from flask_wtf import FlaskForm
from wtforms import  IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError

class BoardForm(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    theme = StringField('theme', validators=[DataRequired()])

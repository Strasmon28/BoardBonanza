from flask_wtf import FlaskForm
from wtforms import  IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError

class ListForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    cover = StringField("cover", validators=[DataRequired()])

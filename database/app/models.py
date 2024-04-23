from . import db
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email=db.Column(db.String, nullable=False, unique=True)
    username=db.Column(db.String, nullable=False, uniqur=True)
    password = db.Column(db.String, nullable=False)
    date_created=db.Column(db.Timestamp, nullable=False, default = lambda: datetime.now(timezone.utc))

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.set_password

    def __repr__(self):
        return f"<User {self.id}|{self.username}>" 
    
    def set_password(self, plaintext_password):
        self.password = generate_password_hash(plaintext_password)
        self.save()
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def check_password(self, plaintext_password):
        return check_password_hash(self.password, plaintext_password)
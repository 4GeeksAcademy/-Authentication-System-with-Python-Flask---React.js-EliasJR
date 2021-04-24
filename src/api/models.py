from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, id, name, email, password, location, is_active):
        self.id = id
        self.name = name
        self.email = email 
        self.password = password
        self.location = location
        self.is_active = is_active

class SuperMarket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    market_name = db.Column(db.String(50), unique=True, nullable=False)
    location = db.Column(db.String(50), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Product_name = db.Column(db.Integer, unique=True ,nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), unique=True ,nullable=False)
    
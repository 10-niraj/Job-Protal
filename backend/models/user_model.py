from database.db import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    contactNo = db.Column(db.String(10), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    education = db.Column(db.String(150), nullable=False)
    jobprofile = db.Column(db.String(150), nullable=False)


    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "contactNo": self.contactNo,
            "city": self.city,
            "education": self.education,
            "jobprofile": self.jobprofile
        }
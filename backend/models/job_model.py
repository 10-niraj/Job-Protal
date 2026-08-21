from database.db import db

class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    companyName = db.Column(db.String(150), nullable=False)
    timing = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.String(100), nullable=False)
    job = db.Column(db.String(150), nullable=False)
    jobType = db.Column(db.String(20), nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "companyName": self.companyName,
            "timing": self.timing,
            "city": self.city,
            "salary": self.salary,
            "job": self.job,
            "jobType": self.jobType
        }
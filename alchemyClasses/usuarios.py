from sqlalchemy import Column, Integer, String
from alchemyClasses import db
from sqlalchemy import LargeBinary



class usuarios(db.Model):
    __tablename__ = 'usuarios'
    idUsuario = Column(Integer, primary_key=True)
    nombre = Column(String(200))
    apPat = Column(String(200))
    apMat = Column(String(200), nullable=True)
    password = Column(String(64))
    email = Column(String(500), nullable=True, unique=True)
    profilePicture = Column(LargeBinary, nullable=True)
    superUser = Column(Integer, nullable=True) 

    def __init__(self, nombre, apPat, password, apMat=None, email=None, profilePicture=None, superUser=None):
        self.nombre = nombre
        self.apPat = apPat
        self.apMat = apMat
        self.password = password
        self.email = email
        self.profilePicture = profilePicture
        self.superUser = superUser

    def __str__(self):
        return f'Nombre:{self.nombre}\nEmail:{self.email}\n'
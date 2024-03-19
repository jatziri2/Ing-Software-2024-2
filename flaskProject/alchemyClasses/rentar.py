from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, ForeignKey
from datetime import datetime, timedelta
from alchemyClasses import db

class rentar(db.Model):
    
    __tablename__ = 'rentar'
    idRentar = Column(Integer, primary_key=True)
    idUsuario = Column(Integer, ForeignKey('usuarios.idUsuario'))
    idPelicula = Column(Integer, ForeignKey('peliculas.idPelicula'))
    fecha_renta = Column(DateTime)
    dias_de_renta = Column(Integer, nullable=True)
    estatus = Column(SmallInteger, nullable=True)
    users = db.relationship("usuarios", backref=db.backref("rentasu", cascade="all, delete-orphan"))
    pelis = db.relationship("peliculas", backref=db.backref("rentasp", cascade="all, delete-orphan"))
    
    def __init__(self, idUsuario, idPelicula, fecha_renta, dias_de_renta=5, estatus=0):
        self.idUsuario = idUsuario
        self.idPelicula = idPelicula
        self.fecha_renta = fecha_renta
        self.dias_de_renta = dias_de_renta
        self.estatus = estatus
        
    def vencida(self):
        if self.dias_de_renta is None:
            return False
        else:
            fecha_devolucion = self.fecha_renta + timedelta(days=self.dias_de_renta)
            return (datetime.now() > fecha_devolucion) and (self.estatus == 0)
        
    def __str__(self):
        return f'ID Usuario:{self.idUsuario}\nID Pelicula:{self.idPelicula}\nFecha de renta:{self.fecha_renta}\nDias de renta:{self.dias_de_renta}\nEstatus:{self.estatus}\n'
from alchemyClasses.rentar import rentar
from alchemyClasses import db

#CRUD: Create, Read, Update, Delete
def crear_renta(idUsuario, idPelicula, fecha_renta, dias_de_renta=5, estatus=0):
    try:
        nueva_renta = rentar(idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus)
        db.session.add(nueva_renta)
        db.session.commit()
        return 0
    except Exception as e:
        print("Error al crear la renta:", e)
        return -1

def leer_rentas():
    return rentar.query.all()

# Función para actualizar una renta por su ID
def actualizar_estatus_renta(id, idUsuario=None, idPelicula=None, fecha_renta=None, dias_de_renta=None, estatus=None):
    renta = rentar.query.get(id)
    if renta is None:
        return -1
    else:
        if idUsuario:
            renta.idUsuario = idUsuario
        if idPelicula:
            renta.idPelicula = idPelicula
        if fecha_renta:
            renta.fecha_renta = fecha_renta
        if dias_de_renta:
            renta.dias_de_renta = dias_de_renta
        if estatus is not None:
            renta.estatus = estatus
        try:
            db.session.commit()
            return 0
        except:
            return -1

#Eliminar un registro por id
def eliminar_renta(id_renta):
    renta = rentar.query.filter(rentar.idRentar == id_renta).first()
    if renta is not None:
        db.session.delete(renta)
        db.session.commit() 
    else:
        print("La renta no existe")


#Eliminar todos los registros
def eliminar_todas_las_rentas():
    for renta in rentar.query.all():
        db.session.delete(renta)
    db.session.commit()
from alchemyClasses.peliculas import peliculas
from alchemyClasses import db
#CRUD: Create, Read, Update, Delete
def crear_pelicula(nombre, genero=None, duracion=None, inventario=1):
    nueva_pelicula = peliculas(nombre=nombre, genero=genero, duracion=duracion, inventario=inventario)
    try:
        db.session.add(nueva_pelicula)
        db.session.commit()
        return 0
    except:
        return -1

def leer_peliculas():
    return peliculas.query.all()

def actualizar_pelicula(id, nombre=None, genero=None, duracion=None, inventario=None):
    pelicula = peliculas.query.get(id)
    if pelicula is None:
        return -1
    else:
        if nombre:
            pelicula.nombre = nombre
        if genero:
            pelicula.genero = genero
        if duracion:
            pelicula.duracion = duracion
        if inventario:
            pelicula.inventario = inventario
        try:
            db.session.commit()
            return 0
        except:
            return -1

def eliminar_pelicula(id_pelicula):
    pelicula = peliculas.query.filter(peliculas.idPelicula == id_pelicula).first()
    if pelicula is not None:
        db.session.delete(pelicula)
        db.session.commit()
        return 0
    else:
        print("La pelicula no existe")
        return -1
    
#Eliminar todos los registros
def eliminar_todas_las_peliculas():
    for pelicula in peliculas.query.all():
        db.session.delete(pelicula)
    db.session.commit()
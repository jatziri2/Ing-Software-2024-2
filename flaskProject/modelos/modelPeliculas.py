from alchemyClasses.peliculas import peliculas
from alchemyClasses import db
#CRUD: Create, Read, Update, Delete
def crear_pelicula(nombre, genero=None, duracion=None, inventario=1):
    if not nombre:
        print("El nombre de la película es obligatorio")
        return
    nuevaPelicula = peliculas(nombre, genero, duracion, inventario)
    db.session.add(nuevaPelicula)
    db.session.commit()

def leer_peliculas():
    return peliculas.query.all()

def leer_pelicula_id(id_pelicula):
    if not id_pelicula:
        print("El ID de la película es obligatorio")
        return None
    pelicula = peliculas.query.get(id_pelicula)
    if pelicula:
        print(pelicula)
        return str(pelicula)
    else:
        print("La película no existe")
        return None

def leer_pelicula_nombre(nombre):
    if not nombre:
        print("El nombre de la película es obligatorio")
        return None
    pelicula = peliculas.query.filter(peliculas.nombre == nombre).first()
    if pelicula:
        print(pelicula)
        return str(pelicula)
    else:
        print("La película no existe")
        return None

def actualizar_pelicula(id, nombre, genero, duracion, inventario):
    pelicula = leer_pelicula_id(id)
    pelicula.nombre = nombre
    pelicula.genero = genero
    pelicula.duracion = duracion
    pelicula.inventario = inventario
    db.session.commit()

def actualizar_nombre_pelicula(id, nombre_nuevo):
    pelicula = peliculas.query.filter(peliculas.idPelicula == id).first()
    if pelicula is not None:
        pelicula.nombre = nombre_nuevo
        db.session.commit()
    else:
        print("La pelicula no existe")

def eliminar_pelicula(id):
    if not id:
        print("El ID de la película es obligatorio")
        return
    pelicula = peliculas.query.get(id)
    if pelicula:
        try:
            db.session.delete(pelicula)
            db.session.commit()
            return 0
        except Exception as e:
            print("Error al eliminar la película", e)
            return -1
    else:
        print("La película no existe")

def eliminar_todas_las_peliculas():
    confirmacion = input("¿Estás seguro que deseas eliminar todas las películas? (s/n): ")
    if confirmacion.lower() == 's':
        for pelicula in peliculas.query.all():
            db.session.delete(pelicula)
        db.session.commit()
        print("Todas las películas han sido eliminadas")
    else:
        print("Operación cancelada")
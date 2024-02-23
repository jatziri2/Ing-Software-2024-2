from alchemyClasses.peliculas import peliculas
from alchemyClasses import db

def ver_registros_peliculas():
    for pelicula in peliculas.query.all():
        print(pelicula)

def filtrar_pelicula_por_id(id_pelicula):
    pelicula = peliculas.query.filter_by(idPelicula=id_pelicula).first()
    if pelicula is not None:
        print(pelicula)
    else:
        print("Pelicula no encontrada.")

def cambiar_nombre_pelicula(id_pelicula,nombre):
    pelicula = peliculas.query.filter(peliculas.idPelicula==id_pelicula).first()
    if pelicula is not None:
        pelicula.nombre= nombre
        db.session.commit()
        print("Actualizacion realizada con exito")
    else:
        print("Pelicula no encontrada")

def eliminar_pelicula_por_id(id_pelicula):
    pelicula = peliculas.query.get(id_pelicula)
    if pelicula is not None:
        db.session.delete(pelicula)
        db.session.commit()
        print(f"Pelicula con ID {id_pelicula} eliminada exitosamente.")
    else:
        print("Pelicula no encontrada.")

def eliminar_todas_las_peliculas():
    confirmacion = input("¿Estás seguro que deseas eliminar todas las peliculas? (y/n): ")
    if confirmacion.lower() == 'y':
        for pelicula in peliculas.query.all():
            db.session.delete(pelicula)
        db.session.commit()
        print("Todas las peliculas han sido eliminadas")
    else:
        print("Operación de eliminación cancelada.")





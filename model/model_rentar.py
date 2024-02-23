from alchemyClasses.rentar import rentar
from alchemyClasses import db

def ver_registros_rentas():
    for renta in rentar.query.all():
        print(renta)

def filtrar_renta_por_id(id_renta):
    renta = rentar.query.filter_by(idRentar=id_renta).first()
    if renta is not None:
        print(renta)
    else:
        print("Renta no encontrada.")

def cambiar_fecha_renta(id_renta,fecha_modificada):
    renta = rentar.query.filter(rentar.idRentar==id_renta).first()
    if renta is not None:
        renta.fecha_renta = fecha_modificada
        db.session.commit()
        print("Actualizacion realizada con exito")
    else:
        print("Renta no encontrada")

def eliminar_renta_por_id(id_renta):
    renta = rentar.query.get(id_renta)
    if renta is not None:
        db.session.delete(renta)
        db.session.commit()
        print(f"Renta con ID {id_renta} eliminado exitosamente.")
    else:
        print("Renta no encontrada.")

def eliminar_todas_las_rentas():
    confirmacion = input("¿Estás seguro que deseas eliminar todos las rentar? (y/n): ")
    if confirmacion.lower() == 'y':
        for renta in rentar.query.all():
            db.session.delete(renta)
        db.session.commit()
        print("Todos los registros de rentas han sido eliminados")
    else:
        print("Operación de eliminación cancelada.")



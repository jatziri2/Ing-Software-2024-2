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

def leer_rentas_id(id_rentas):
    if not id_rentas:
        print("El ID de la renta es obligatorio")
        return None
    renta = rentar.query.get(id_rentas)
    if renta:
        print(renta)
        return str(renta)
    else:
        print("La renta no existe")
        return None

def leer_renta_fecha(fecha):
    if not fecha:
        print("La fecha es obligatoria")
        return None
    renta = rentar.query.filter(rentar.nombre == fecha).first()
    if renta:
        print(renta)
        return str(renta)
    else:
        print("La renta no existe")
        return None

def actualizar_fecha_renta(idRenta,fecha_nueva):
    renta = rentar.query.filter(rentar.idRentar == idRenta).first()
    if renta is not None:
        renta.dias_de_renta = fecha_nueva
        db.session.commit()
    else:
        print("La renta no existe")

def actualizar_estatus_renta(idRenta, estatus_nuevo):
    renta = rentar.query.filter(rentar.idRentar == idRenta).first()
    if renta is not None:
        renta.estatus = estatus_nuevo
        db.session.commit()
        return 0
    else:
        print("La renta no existe")
        return -1

def eliminar_renta(id):
    if not id:
        print("El ID de la renta es obligatorio")
        return
    renta = leer_rentas_id(id)
    if renta:
        try:
            db.session.delete(renta)
            db.session.commit()
            return 0
        except Exception as e:
            print("Error no pudimos eliminar la renta", e)
            return -1
    else:
        print("La renta no existe")

def eliminar_todas_las_rentas():
    confirmacion = input("¿Estás seguro que deseas eliminar todas las rentas? (s/n): ")
    if confirmacion.lower() == 's':
        for renta in rentar.query.all():
            db.session.delete(renta)
        db.session.commit()
        print("Todas las rentas han sido eliminadas")
    else:
        print("Operación cancelada")
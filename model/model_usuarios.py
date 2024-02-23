from alchemyClasses.usuarios import usuarios
from alchemyClasses import db

def ver_registros_usuarios():
    for usuario in usuarios.query.all():
        print(usuario)

def filtrar_usuario_por_id(id_usuario):
    usuario = usuarios.query.filter_by(idUsuario=id_usuario).first()
    if usuario is not None:
        print(usuario)
    else:
        print("Usuario no encontrado.")

def cambiar_nombre_usuario(id_usuario,nombre):
    usuario = usuarios.query.filter(usuarios.idUsuario==id_usuario).first()
    if usuario is not None:
        usuario.nombre= nombre
        db.session.commit()
        print("Actualizacion realizada con exito")
    else:
        print("Usuario no encontrado")

def eliminar_usuario_por_id(id_usuario):
    usuario = usuarios.query.get(id_usuario)
    if usuario is not None:
        db.session.delete(usuario)
        db.session.commit()
        print(f"Usuario con ID {id_usuario} eliminado exitosamente.")
    else:
        print("Usuario no encontrado.")

def eliminar_todos_los_usuarios():
    confirmacion = input("¿Estás seguro que deseas eliminar todos las usuarios? (y/n): ")
    if confirmacion.lower() == 'y':
        for usuario in usuarios.query.all():
            db.session.delete(usuario)
        db.session.commit()
        print("Todos los usuarios han sido eliminados")
    else:
        print("Operación de eliminación cancelada.")





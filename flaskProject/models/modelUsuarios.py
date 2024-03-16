from alchemyClasses.usuarios import usuarios
from alchemyClasses import db

#CRUD: Create, Read, Update, Delete
def crear_usuario(nombre, apPat, password, apMat=None, email=None, profilePicture=None, superUser=None):
    nuevo_usuario = usuarios(nombre, apPat, password, apMat, email, profilePicture, superUser)
    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return 0
    except:
        return -1

def leer_usuarios():
    return usuarios.query.all()

def encontrar_usuario(id_usuario):
    usuario = usuarios.query.filter(usuarios.idUsuario == id_usuario).first()
    if usuario is not None:
        print(usuario)
        return str(usuario)
    else:
        print("El usuario con id = "+ str(id_usuario) + " no existe")
        return -1

def leer_usuario_nombre(nombre):
    if not nombre:
        print("El nombre de la película es obligatorio")
        return None
    usuario = usuarios.query.filter(usuarios.nombre == nombre).first()
    if usuario:
        print(usuario)
        return str(usuario)
    else:
        print("El usuario no existe")
        return None

def actualizar_usuario(id_usuario, nombre_nuevo, apPat_nuevo, password_nuevo, apMat_nuevo, email_nuevo, profilePicture_nuevo, superUser_nuevo):
    usuario = usuarios.query.filter(usuarios.idUsuario == id_usuario).first()
    if usuario is not None:
        usuario.nombre = nombre_nuevo
        usuario.apPat = apPat_nuevo
        usuario.password = password_nuevo
        usuario.apMat = apMat_nuevo
        usuario.email = email_nuevo
        usuario.profilePicture = profilePicture_nuevo
        usuario.superUser = superUser_nuevo
        db.session.commit()
        return 0
    else:
        print("El usuario con id = "+ str(id_usuario) + " no existe")
        return -1

def actualizar_nombre_usuario(id, nombre_nuevo):
    usuario = usuarios.query.filter(usuarios.idUsuario == id).first()
    if usuario is not None:
        usuario.nombre = nombre_nuevo
        db.session.commit()
    else:
        print("El usuario no existe")

def eliminar_usuario(id_usuario):
    usuario = usuarios.query.filter(usuarios.idUsuario == id_usuario).first()
    if usuario is not None:
        db.session.delete(usuario)
        db.session.commit()
        return 0
    else:
        print("El usuario con id = "+ str(id_usuario) + " no existe")
        return -1

def eliminar_todas_los_usuarios():
    confirmacion = input("¿Estás seguro que deseas eliminar todos los usuarios? (s/n): ")
    if confirmacion.lower() == 's':
        for usuario in usuarios.query.all():
            db.session.delete(usuario)
        db.session.commit()
        print("Todos los usuarios han sido eliminadas")
    else:
        print("Operación cancelada")
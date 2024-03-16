from flask import Blueprint, request, render_template, flash, url_for, redirect
from modelos import modelUsuarios as mu

usuario_blueprint = Blueprint('usuario', __name__, url_prefix='/usuario')


@usuario_blueprint.route('/registro', methods=['GET', 'POST'])
def crear_usuario():
    if request.method == "GET":
        return render_template('crearUsuarios.html')
    else:
        
        nombre = request.form["inputNombre"]
        print(nombre)
        apellidoP = request.form["inputApellidoPaterno" ]
        print(apellidoP)
        apellidoM = request.form["inputApellidoMaterno"]
        print(apellidoM)
        correo = request.form["inputEmail"]
        print(correo)
        password = request.form["password"]
        print(password)
        
        if 'superuser' in request.form:
            superuser = 1
        else:
            superuser = 0
        print(superuser)
            
        
        retorno = mu.crear_usuario(nombre, apellidoP, password, apellidoM, correo, None, superuser)
        
        if retorno == -1:
            return render_template("avisos.html", mensaje="El correo ya existe", nombre = nombre, apellidoP = apellidoP, apellidoM = apellidoM, superuser = superuser, password = password)
        else:
            return render_template("avisos.html", mensaje="Usuario creado")
    
@usuario_blueprint.route('/borrar', methods=['GET', 'POST'])
def eliminar_usuario():
    if request.method == "GET":
        return render_template('eliminarUsuario.html')
    else:
        id_usuario = request.form["idCliente"]
        print(id_usuario)
        retorno = mu.eliminar_usuario(id_usuario)
        if retorno == -1:
            return render_template("eliminarUsuario.html", mensaje="El usuario no existe")
        else:
            return render_template("avisos.html", mensaje="Usuario eliminado con éxito")


@usuario_blueprint.route('/actualizar', methods=['GET', 'POST'])
def actualizar_usuario():
    if request.method == "GET":
        return render_template('actualizarUsuario2.html')
    else:
        id = request.form["userId"]
        print(id)
        nombre = request.form["nombre"]
        print(nombre)
        apellidoP = request.form["apPat" ]
        print(apellidoP)
        apellidoM = request.form["apMat"]
        print(apellidoM)
        correo = request.form["email"]
        print(correo)
        password = request.form["password"]
        print(password)
        
        if 'superUser' in request.form:
            superuser_value = request.form["superUser"]
            if superuser_value == 1 or superuser_value == 0:
                superuser = superuser_value
            else:
               superuser=None
        else:
            superuser=None
            
            
        
        retorno = mu.editar_usuario(id, nombre, apellidoP, apellidoM, password, correo, None, superuser)
        
        if retorno == -1:
            return render_template("avisos.html", mensaje="Ha habido un error al querer actualizar")
        else:
            return render_template("avisos.html", mensaje="Usuario actualizado con éxito")
 
    
    
@usuario_blueprint.route('/usuarios')
def leer_usuarios():
    usuarios = mu.leer_usuarios()
    return render_template("leerUsuarios.html", usuarios=usuarios)
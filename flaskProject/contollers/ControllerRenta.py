from flask import Blueprint, request, render_template, flash, url_for, redirect
from datetime import datetime
from modelos import modelRenta as mr

renta_blueprint = Blueprint('rentar', __name__, url_prefix='/rentar')


@renta_blueprint.route('/registro', methods=['GET', 'POST'])
def crear_renta():
    if request.method == "GET":
        return render_template('crearRenta.html')
    else:
        idUsuario = request.form["idUsuario"]
        print(idUsuario)
        idPelicula = request.form["idPelicula"]
        print(idPelicula)
        fecha_renta = request.form["fechaRenta"]
        print(fecha_renta)
        dias_de_renta = request.form["diasRenta"]
        print(dias_de_renta)
        
        if dias_de_renta == "":
            dias_de_renta = 10
        
        if 'devuelta' in request.form:
            estatus = 1
        else:
            estatus = 0
        print(estatus)
        
        retorno = mr.crear_renta(idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus)
        
        if retorno == -1:
            return render_template("avisos.html", mensaje= "Alguno de los ID's ingresados no existe", idUsuario=idUsuario,idPelicula=idPelicula,fecha_renta=fecha_renta,dias_de_renta=dias_de_renta)
        else:
            return render_template("avisos.html", mensaje="Se ha registrado la renta de forma exitosa")

@renta_blueprint.route('/actualizar', methods=['GET', 'POST'])
def actualizar_renta():
    if request.method == "GET":
        return render_template('actualizarRenta.html')
    else:
        idRenta= request.form["rentaId"]
        print(idRenta)
        estatus = request.form.get('estatus')
        print(estatus)

              
        retorno = mr.actualizar_estatus_renta(idRenta,None, None, None, None, estatus)
        
        if retorno == -1:
            return render_template("avisos.html", mensaje="Ha habido un error al querer actualizar")
        else:
            return render_template("avisos.html", mensaje="Renta actualizada con éxito")
@renta_blueprint.route('/rentar')
def leer_rentas():
    rentas = mr.leer_rentas()
    return render_template("leerRenta.html", rentas=rentas)
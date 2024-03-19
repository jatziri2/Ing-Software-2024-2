from flask import Blueprint, request, render_template, flash, url_for, redirect
from modelos import modelPeliculas as mp

pelicula_blueprint = Blueprint('peliculas', __name__, url_prefix='/peliculas')


@pelicula_blueprint.route('/registro', methods=['GET', 'POST'])
def crear_pelicula():
    if request.method == "GET":
        return render_template('crearPelicula.html')
    else:
        
        nombre = request.form["nombre"]
        print(nombre)
        genero = request.form["genero"]
        print(genero)
        duracion = request.form["duracion"]
        print(duracion)
        inventario = request.form["inventario"]
            
        
        mp.crear_pelicula(nombre, genero, duracion, inventario)
        
        return render_template("avisos.html", mensaje= "Pelicula creada con exito")
    
@pelicula_blueprint.route('/borrar', methods=['GET', 'POST'])
def eliminar_pelicula():
    if request.method == "GET":
        return render_template('eliminarPelicula.html')
    else:
        id_pelicula = request.form["idPelicula"]
        print(id_pelicula)
        retorno = mp.eliminar_pelicula(id_pelicula)
        if retorno == -1:
            return render_template("avisos.html", mensaje="La pelicula no existe")
        else:
            return render_template("avisos.html", mensaje="Pelicula eliminada con éxito")


@pelicula_blueprint.route('/actualizar', methods=['GET', 'POST'])
def actualizar_pelicula():
    if request.method == "GET":
        return render_template('actualizarPelicula.html')
    else:
        id = request.form["IdPelicula"]
        print(id)
        nombre = request.form["nombre"]
        print(nombre)
        genero = request.form["genero" ]
        print(genero)
        duracion = request.form["duracion"]
        print(duracion)
        inventario = request.form["inventario"]
        print(inventario)
        
        retorno = mp.actualizar_pelicula(id, nombre, genero, duracion, inventario)
        
        if retorno == -1:
            return render_template("avisos.html", mensaje="Ha habido un error al querer actualizar")
        else:
            return render_template("avisos.html", mensaje="Película actualizado con éxito")
 
    
    
@pelicula_blueprint.route('/peliculas')
def leer_peliculas():
    peliculas = mp.leer_peliculas()
    return render_template("leerPelicula.html", peliculas=peliculas)
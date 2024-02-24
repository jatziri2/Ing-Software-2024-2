from flask import Flask
from sqlalchemy import and_, or_
from alchemyClasses import db
from alchemyClasses.rentar import rentar
from alchemyClasses.usuarios import usuarios
from alchemyClasses.peliculas import peliculas
from cryptoUtils.CryptoUtils import cipher
from hashlib import sha256
from model.model_peliculas import ver_registros_peliculas, filtrar_pelicula_por_id, cambiar_nombre_pelicula, eliminar_pelicula_por_id, eliminar_todas_las_peliculas
from model.model_usuarios import ver_registros_usuarios, filtrar_usuario_por_id, cambiar_nombre_usuario, eliminar_usuario_por_id, eliminar_todos_los_usuarios
from model.model_rentar import ver_registros_rentas, filtrar_renta_por_id, cambiar_fecha_renta, eliminar_renta_por_id, eliminar_todas_las_rentas
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:tupassword@localhost:3306/lab_ing_software'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)

def mostrar_menu():
    print("===== MENÚ PRINCIPAL =====")
    print("1. Ver registros de una tabla.")
    print("2. Filtrar registros de una tabla por ID.")
    print("3. Actualizar la columna nombre o fecha de un registro.")
    print("4. Eliminar un registro por ID.")
    print("5. Eliminar todos los registros de una tabla.")
    print("6. Salir")

if __name__ == '__main__':
    with app.app_context():
        while True:
            mostrar_menu()

            try:
                opcion = int(input("Seleccione una opción (1-6): "))
            except ValueError:
                print("Error: Ingrese un número válido.")
                continue

            if opcion == 1:
                tabla = input("Ingrese el nombre de la tabla (peliculas, usuarios, rentas): ").lower()
                if tabla not in ["peliculas", "usuarios", "rentas"]:
                    print("Error: Tabla no válida. Inténtelo de nuevo.")
                    continue

                if tabla == "peliculas":
                    ver_registros_peliculas()
                elif tabla == "usuarios":
                    ver_registros_usuarios()
                elif tabla == "rentas":
                    ver_registros_rentas()

            elif opcion == 2:
                tabla = input("Ingrese el nombre de la tabla (peliculas, usuarios, rentas): ").lower()
                if tabla not in ["peliculas", "usuarios", "rentas"]:
                    print("Error: Tabla no válida. Inténtelo de nuevo.")
                    continue

                try:
                    id_buscar = int(input("Ingrese el ID a filtrar: "))
                except ValueError:
                    print("Error: Ingrese un ID válido.")
                    continue

                if tabla == "peliculas":
                    filtrar_pelicula_por_id(id_buscar)
                elif tabla == "usuarios":
                    filtrar_usuario_por_id(id_buscar)
                elif tabla == "rentas":
                    filtrar_renta_por_id(id_buscar)
                
                
            elif opcion == 3:
                tabla = input("Ingrese el nombre de la tabla (peliculas, usuarios, rentas): ").lower()
                if tabla not in ["peliculas", "usuarios", "rentas"]:
                    print("Error: Tabla no válida. Inténtelo de nuevo.")
                    continue

                try:
                    id_actualizar = int(input("Ingrese el ID del registro a actualizar: "))
                except ValueError:
                    print("Error: Ingrese un ID válido.")
                    continue

                nuevo_valor = input("Ingrese el nuevo valor: ")
                if tabla == "peliculas":
                    cambiar_nombre_pelicula(id_actualizar, nuevo_valor)
                elif tabla == "usuarios":
                    cambiar_nombre_usuario(id_actualizar, nuevo_valor)
                elif tabla == "rentas":
                    cambiar_fecha_renta(id_actualizar, nuevo_valor)

            elif opcion == 4:
                tabla = input("Ingrese el nombre de la tabla (peliculas, usuarios, rentas): ").lower()
                if tabla not in ["peliculas", "usuarios", "rentas"]:
                    print("Error: Tabla no válida. Inténtelo de nuevo.")
                    continue

                try:
                    id_eliminar = int(input("Ingrese el ID del registro a eliminar: "))
                except ValueError:
                    print("Error: Ingrese un ID válido.")
                    continue

                if tabla == "peliculas":
                    eliminar_pelicula_por_id(id_eliminar)
                elif tabla == "usuarios":
                    eliminar_usuario_por_id(id_eliminar)
                elif tabla == "rentas":
                    eliminar_renta_por_id(id_eliminar)

            elif opcion == 5:
                tabla = input("Ingrese el nombre de la tabla (peliculas, usuarios, rentas): ").lower()
                if tabla not in ["peliculas", "usuarios", "rentas"]:
                    print("Error: Tabla no válida. Inténtelo de nuevo.")
                    continue

                if tabla == "peliculas":
                    eliminar_todas_las_peliculas()
                elif tabla == "usuarios":
                    eliminar_todos_los_usuarios()
                elif tabla == "rentas":
                    eliminar_todas_las_rentas()


            elif opcion == 6:
                print("Saliendo del programa. ¡Hasta luego!")
                break

            else:
                print("Opción no válida. Inténtelo de nuevo.")
        #Pruebas------
        #ver_registros_peliculas()
        #filtrar_pelicula_por_id(4)
        #cambiar_nombre_pelicula(39, "La La Land2")
        #eliminar_pelicula_por_id(39)
        #eliminar_todas_las_peliculas()

        #ver_registros_usuarios()
        #filtrar_usuario_por_id(13)
        #cambiar_nombre_usuario(59, "Jatziri")
        #eliminar_usuario_por_id(59)
        #eliminar_todos_los_usuarios()

        #ver_registros_rentas()
        #filtrar_renta_por_id(49)
        #cambiar_fecha_renta(66, "2024-02-22")
        #eliminar_renta_por_id(66)
        #eliminar_todas_las_rentas()

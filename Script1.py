import pymysql.cursors
import random
from datetime import datetime, timedelta

# Lista de nombres, apellidos maternos, apellidos paternos y géneros de película permitidos
nombres_permitidos = ["Ana", "Juan", "María", "Carlos", "Laura", "Diego", "Isabel", "Javier", "Gabriela",
                      "Alejandro", "Natalia", "Andrés", "Sofia", "Daniel", "Valentina", "Ricardo", "Paula",
                      "Luis", "Marta", "Roberto"]

apellidos_paternos_permitidos = ["Ortiz", "Silva", "Medina", "Herrera", "Mendoza", "Ramos", "Castro", "Núñez",
                                 "Bravo", "Álvarez", "Cordero", "Molina", "Ríos", "Aguilar", "Rojas", "Peralta",
                                 "Salazar", "Cervantes", "Guzmán", "León"]

apellidos_maternos_permitidos = ["Rodríguez", "García", "Pérez", "López", "González", "Hernández", "Martínez",
                                 "Sánchez", "Ramírez", "Torres", "Flores", "Díaz", "Moreno", "Castro", "Ruiz",
                                 "Gómez", "Vargas", "Reyes", "Jiménez", "Morales"]

generos_pelicula_permitidos = ["Acción", "Aventura", "Comedia", "Drama", "Ciencia ficción", "Fantasía", "Terror",
                                "Suspense", "Romance", "Animación", "Documental", "Musical"]

nombres_peliculas = ["El Padrino", "Titanic", "Inception", "La La Land", "Jurassic Park", 
                     "Forrest Gump", "Avatar", "The Shawshank Redemption", "The Dark Knight", 
                     "Casablanca", "The Godfather Part II", "The Matrix", 
                     "Star Wars: Episode IV - A New Hope", "Avengers: Endgame", "Pulp Fiction", 
                     "Schindler's List", "Gladiator", "The Silence of the Lambs", 
                     "The Lord of the Rings: The Fellowship of the Ring", 
                     "The Shawshank Redemption"]
# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='tupassword',
                             database='lab_ing_software',
                             cursorclass=pymysql.cursors.DictCursor)

def create(table_name, data):
    # Conexión a la base de datos (ajusta los parámetros según tu configuración)
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='tupassword',
                                 database='lab_ing_software',
                                 cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            placeholders = ', '.join(['%s'] * len(data))
            columns = ', '.join(data.keys())
            query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
            cursor.execute(query, tuple(data.values()))

            # Obtener el último ID insertado
            last_id = cursor.lastrowid

        connection.commit()
        print(f"Registro insertado en la tabla {table_name} correctamente. ID: {last_id}")

        return last_id

    except Exception as e:
        print(f"Error al insertar registro en la tabla {table_name}: {e}")
        connection.rollback()

    finally:
        connection.close()

def produceCadenaAleatoria(length=10, permitted_list=None):
    if permitted_list is None:
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return ''.join(random.choice(characters) for _ in range(length))
    else:
        return random.choice(permitted_list)

def fecha_random(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + timedelta(days=random_days)
################################primer funcion
def insertar_en_tablas():
    # Conexión a la base de datos (ajusta los parámetros según tu configuración)
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='tupassword',
                                 database='lab_ing_software',
                                 cursorclass=pymysql.cursors.DictCursor)

    try:
        # Generar datos aleatorios para la tabla 'usuarios'
        usuario_data = {
            "nombre": produceCadenaAleatoria(permitted_list=nombres_permitidos),
            "apPat": produceCadenaAleatoria(permitted_list=apellidos_paternos_permitidos),
            "apMat": produceCadenaAleatoria(permitted_list=apellidos_maternos_permitidos),
            "password": produceCadenaAleatoria(),
            "email": produceCadenaAleatoria() + "@gmail.com",
            "superUser": 0
        }
        create("usuarios", usuario_data)

        # Generar datos aleatorios para la tabla 'peliculas'
        pelicula_data = {
        "nombre": produceCadenaAleatoria(permitted_list=nombres_peliculas),
        "genero": produceCadenaAleatoria(permitted_list=generos_pelicula_permitidos),
        "duracion": random.randint(60, 180),
        "inventario": random.randint(1, 50)
        }
        create("peliculas", pelicula_data)

        # Obtener los IDs recién insertados
        with connection.cursor() as cursor:
            cursor.execute("SELECT idUsuario FROM usuarios WHERE email = %s", (usuario_data["email"],))
            id_usuario = cursor.fetchone()["idUsuario"]

            cursor.execute("SELECT idPelicula FROM peliculas WHERE nombre = %s", (pelicula_data["nombre"],))
            id_pelicula = cursor.fetchone()["idPelicula"]

        # Generar datos aleatorios para la tabla 'rentar'
        fecha_inicio = datetime(2020, 1, 1)
        fecha_fin = datetime(2024, 9, 29)
        fecha_renta = fecha_random(fecha_inicio, fecha_fin)

        rentar_data = {
            "idUsuario": id_usuario,
            "idPelicula": id_pelicula,
            "fecha_renta": fecha_renta.strftime("%Y-%m-%d"),
            "dias_de_renta": random.randint(1, 7),
            "estatus": random.randint(0, 1)
        }

        create("rentar", rentar_data)

        # Confirmar cambios
        connection.commit()
        print("Registros insertados correctamente.")

    except Exception as e:
        print(f"Error al insertar registros: {e}")
        connection.rollback()

    finally:
        connection.close()
###############################################segunda funcion
def filtrar_usuarios_por_apellido(apellido):
    # Conexión a la base de datos (ajusta los parámetros según tu configuración)
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='tupassword',
                                 database='lab_ing_software',
                                 cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            # Consulta para filtrar usuarios por apellido
            query = "SELECT * FROM `usuarios` WHERE `apPat` LIKE %s OR `apMat` LIKE %s"
            cursor.execute(query, (f"%{apellido}",f"%{apellido}"))
            usuarios_filtrados = cursor.fetchall()

            # Imprimir los usuarios encontrados
            for usuario in usuarios_filtrados:
                print(f"ID: {usuario['idUsuario']}, Nombre: {usuario['nombre']} ApellidoP: {usuario['apPat']} ApellidoM: {usuario['apMat']}, Email: {usuario['email']}")

    except Exception as e:
        print(f"Error al filtrar usuarios: {e}")

    finally:
        connection.close()
############################################funcion tres
def cambiar_genero_pelicula(nombre_pelicula, nuevo_genero):
    # Conexión a la base de datos (ajusta los parámetros según tu configuración)
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='tupassword',
                                 database='lab_ing_software',
                                 cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            # Verificar si la película existe
            cursor.execute("SELECT idPelicula FROM peliculas WHERE nombre = %s", (nombre_pelicula,))
            results = cursor.fetchall()

            if not results:
                print(f"La película '{nombre_pelicula}' no existe.")
                return

            # Actualizar el género de todas las películas con el mismo nombre
            for result in results:
                id_pelicula = result["idPelicula"]
                cursor.execute("UPDATE peliculas SET genero = %s WHERE idPelicula = %s", (nuevo_genero, id_pelicula))

            connection.commit()
            print(f"El género de la película con el nombre '{nombre_pelicula}' se ha cambiado a '{nuevo_genero}'.")

    except Exception as e:
        print(f"Error al cambiar el género de la película: {e}")
        connection.rollback()

    finally:
        connection.close()
#####################################cuarta funcion
def eliminar_rentas_anteriores():
    # Conexión a la base de datos (ajusta los parámetros según tu configuración)
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='tupassword',
                                 database='lab_ing_software',
                                 cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            # Calcular la fecha límite (hoy - 3 días)
            fecha_limite = datetime.now() - timedelta(days=3)

            # Eliminar rentas anteriores a la fecha límite
            cursor.execute("DELETE FROM rentar WHERE fecha_renta <= %s", (fecha_limite,))
            connection.commit()
            print(f"Se han eliminado las rentas anteriores al {fecha_limite}.")

    except Exception as e:
        print(f"Error al eliminar rentas anteriores: {e}")
        connection.rollback()

    finally:
        connection.close()

def insertar_registro_en_tablas():
    # Lógica para insertar un registro en cada tabla
    insertar_en_tablas()

def filtrar_usuarios_por_apellido_usuario():
    # Lógica para filtrar usuarios por apellido
    apellido_usuario = input("Ingresa el apellido para filtrar usuarios: ")
    filtrar_usuarios_por_apellido(apellido_usuario)

def cambiar_genero_pelicula_existente():
    # Lógica para cambiar el género de una película existente
    nombre_pelicula = input("Ingresa el nombre de la película: ")
    nuevo_genero = input("Ingresa el nuevo género: ")
    cambiar_genero_pelicula(nombre_pelicula, nuevo_genero)

def eliminar_rentas_anteriores_a_fecha():
    # Lógica para eliminar rentas anteriores a 3 días
    eliminar_rentas_anteriores()

def mostrar_menu():
    while True:
        print("\nMenú:")
        print("1. Insertar registro en cada tabla")
        print("2. Filtrar usuarios por apellido")
        print("3. Cambiar género de película")
        print("4. Eliminar rentas anteriores a 3 días")
        print("5. Salir")

        opcion = input("Ingresa el número de la opción deseada: ")

        if opcion == '1':
            insertar_registro_en_tablas()
        elif opcion == '2':
            filtrar_usuarios_por_apellido_usuario()
        elif opcion == '3':
            cambiar_genero_pelicula_existente()
        elif opcion == '4':
            eliminar_rentas_anteriores_a_fecha()
        elif opcion == '5':
            print("Saliendo del programa. ¡Hasta luego!")
            break
        else:
            print("Opción no válida. Ingresa un número del 1 al 5.")

# Ejecutar el menú
mostrar_menu()


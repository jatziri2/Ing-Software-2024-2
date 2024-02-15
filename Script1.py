# Este script simula un marcador de tenis siguiendo las reglas especificadas

# Pedir al usuario los nombres de los dos jugadores
jugador1 = input("Nombre del jugador 1: ")
jugador2 = input("Nombre del jugador 2: ")

# Inicializar las variables del marcador
puntos1 = 0 # Puntos del jugador 1
puntos2 = 0 # Puntos del jugador 2
juegos1 = 0 # Juegos del jugador 1
juegos2 = 0 # Juegos del jugador 2
sets1 = 0 # Sets del jugador 1
sets2 = 0 # Sets del jugador 2
saque = 1 # Indica quién saca (1 o 2)
cancha = 1 # Indica en qué cancha se juega (1 o 2)

# Función para convertir los puntos a su representación textual
def puntos_a_texto(puntos):
  if puntos == 0:
    return "0"
  elif puntos == 1:
    return "15"
  elif puntos == 2:
    return "30"
  elif puntos == 3:
    return "40"
  else:
    return "Adv."

# Función para mostrar el marcador actual
def mostrar_marcador():
  global puntos1, puntos2, juegos1, juegos2, sets1, sets2, saque, cancha
  # Formatear el marcador de los puntos
  if puntos1 == puntos2 and puntos1 >= 3:
    # Empate
    marcador_puntos = "40 - 40"
  elif puntos1 > 3 and puntos1 == puntos2 + 1:
    # Ventaja del jugador 1
    marcador_puntos = "Adv. - 40"
  elif puntos2 > 3 and puntos2 == puntos1 + 1:
    # Ventaja del jugador 2
    marcador_puntos = "40 - Adv."
  else:
    # Otro caso
    marcador_puntos = "{} - {}".format(puntos_a_texto(puntos1), puntos_a_texto(puntos2))
  # Mostrar el marcador completo
  print("\nMarcador actual:")
  print("{} | {} | {} | {}".format(jugador1, sets1, juegos1, marcador_puntos))
  print("{} | {} | {} | {}".format(jugador2, sets2, juegos2, marcador_puntos))
  print("Saque: {}".format(jugador1 if saque == 1 else jugador2))
  print("Cancha: {}".format(cancha))

# Función para cambiar el saque al otro jugador
def cambiar_saque():
  global saque
  if saque == 1:
    saque = 2
  else:
    saque = 1

# Función para cambiar la cancha si el número de juegos es impar
def cambiar_cancha():
  global cancha, juegos1, juegos2
  if (juegos1 + juegos2) % 2 == 1:
    # Número impar de juegos
    if cancha == 1:
      cancha = 2
    else:
      cancha = 1

# Función para marcar un juego al jugador que tenga 40 o más puntos y dos puntos de diferencia
def marcar_juego():
  global puntos1, puntos2, juegos1, juegos2
  if puntos1 >= 4 and puntos1 >= puntos2 + 2:
    # Juego para el jugador 1
    juegos1 += 1
    puntos1 = 0
    puntos2 = 0
    cambiar_saque()
    cambiar_cancha()
    return True
  elif puntos2 >= 4 and puntos2 >= puntos1 + 2:
    # Juego para el jugador 2
    juegos2 += 1
    puntos1 = 0
    puntos2 = 0
    cambiar_saque()
    cambiar_cancha()
    return True
  else:
    # No hay juego
    return False

# Función para marcar un set al jugador que tenga 6 o más juegos y dos juegos de diferencia
def marcar_set():
  global juegos1, juegos2, sets1, sets2
  if juegos1 >= 6 and juegos1 >= juegos2 + 2:
    # Set para el jugador 1
    sets1 += 1
    juegos1 = 0
    juegos2 = 0
    return True
  elif juegos2 >= 6 and juegos2 >= juegos1 + 2:
    # Set para el jugador 2
    sets2 += 1
    juegos1 = 0
    juegos2 = 0
    return True
  else:
    # No hay set
    return False

# Función para determinar si hay un ganador del partido
def hay_ganador():
  global sets1, sets2
  if sets1 == 2:
    # Ganador el jugador 1
    return 1
  elif sets2 == 2:
    # Ganador el jugador 2
    return 2
  else:
    # No hay ganador
    return 0

# Mostrar el marcador inicial
mostrar_marcador()

while True:
    try:
        # Pedir al usuario quién es el ganador del punto
        ganador_punto = input("\n¿Quién es el ganador del punto? (1 o 2): ")
        # Validar la entrada
        if ganador_punto == "1":
            # Punto para el jugador 1
            puntos1 += 1
        elif ganador_punto == "2":
            # Punto para el jugador 2
            puntos2 += 1
        else:
            # Entrada inválida
            raise ValueError("Entrada inválida. Introduce 1 o 2.")
        
        # Marcar un juego si se cumple la condición
        marcar_juego()
        # Marcar un set si se cumple la condición
        marcar_set()
        # Mostrar el marcador actualizado
        mostrar_marcador()
        # Comprobar si hay un ganador del partido
        ganador = hay_ganador()
        if ganador == 1:
            # Ganador el jugador 1
            print("\n¡Felicidades, {} ha ganado el partido!".format(jugador1))
            break
        elif ganador == 2:
            # Ganador el jugador 2
            print("\n¡Felicidades, {} ha ganado el partido!".format(jugador2))
            break
        else:
            # Continuar el partido
            pass

    except ValueError as e:
        print(f"Error: {e}")
        print("Hubo un error en la entrada. Por favor, vuelva a intentarlo.")


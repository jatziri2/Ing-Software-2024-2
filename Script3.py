import matplotlib.pyplot as plt
import numpy as np

def funcion_racional(x):
    return np.where(x != 0, 1 / x, np.nan)  # Usamos np.nan para valores donde x=0

# Genera datos para la gráfica
x_vals_neg = np.linspace(-10, -0.1, 200)
x_vals_pos = np.linspace(0.1, 10, 200)
x_vals = np.concatenate((x_vals_neg, x_vals_pos))  # Combina ambos rangos
y_vals = funcion_racional(x_vals)

plt.plot(x_vals, y_vals, label='Función Racional')
plt.title('Gráfica de una Función Racional')
plt.xlabel('Eje X')
plt.ylabel('Eje Y')
plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.legend()
plt.grid(True)

plt.show()


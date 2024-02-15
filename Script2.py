def contar_valles(pasos):
    nivel_del_mar = 0
    nivel_actual = 0
    cantidad_valles = 0

    for paso in pasos:
        if paso == 'U':
            nivel_actual += 1
        elif paso == 'D':
            nivel_actual -= 1

        if paso == 'U' and nivel_actual == nivel_del_mar:
            cantidad_valles += 1

    return cantidad_valles

# Clase para un árbol binario ordenado
class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None
        self.padre = None

class ArbolBinarioOrdenado:
    def __init__(self):
        self.raiz = None

    def agregar_elemento(self, valor):
        if self.raiz is None:
            self.raiz = Nodo(valor)
        else:
            self._agregar_recursivo(valor, self.raiz)

    def _agregar_recursivo(self, valor, nodo_actual):
        if valor <= nodo_actual.valor:
            if nodo_actual.izquierdo is None:
                nuevo_nodo = Nodo(valor)
                nuevo_nodo.padre = nodo_actual
                nodo_actual.izquierdo = nuevo_nodo
            else:
                self._agregar_recursivo(valor, nodo_actual.izquierdo)
        else:
            if nodo_actual.derecho is None:
                nuevo_nodo = Nodo(valor)
                nuevo_nodo.padre = nodo_actual
                nodo_actual.derecho = nuevo_nodo
            else:
                self._agregar_recursivo(valor, nodo_actual.derecho)

    def recorrido_preorden(self):
        return self._recorrido_preorden_recursivo(self.raiz)

    def _recorrido_preorden_recursivo(self, nodo_actual):
        if nodo_actual is not None:
            resultado = [nodo_actual.valor]
            resultado += self._recorrido_preorden_recursivo(nodo_actual.izquierdo)
            resultado += self._recorrido_preorden_recursivo(nodo_actual.derecho)
            return resultado
        else:
            return []

    def recorrido_inorden(self):
        return self._recorrido_inorden_recursivo(self.raiz)

    def _recorrido_inorden_recursivo(self, nodo_actual):
        if nodo_actual is not None:
            resultado = self._recorrido_inorden_recursivo(nodo_actual.izquierdo)
            resultado += [nodo_actual.valor]
            resultado += self._recorrido_inorden_recursivo(nodo_actual.derecho)
            return resultado
        else:
            return []

    def recorrido_postorden(self):
        return self._recorrido_postorden_recursivo(self.raiz)

    def _recorrido_postorden_recursivo(self, nodo_actual):
        if nodo_actual is not None:
            resultado = self._recorrido_postorden_recursivo(nodo_actual.izquierdo)
            resultado += self._recorrido_postorden_recursivo(nodo_actual.derecho)
            resultado += [nodo_actual.valor]
            return resultado
        else:
            return []


# Pruebas para la función contar_valles y la clase ArbolBinarioOrdenado
if __name__ == "__main__":
    # Prueba de contar_valles
    ejemplo = "DDDUUUDDDUUU"
    resultado = contar_valles(ejemplo)
    print(f"El numero de valles atravesados es: {resultado}") 

    # Pruebas para la clase ArbolBinarioOrdenado
    arbol = ArbolBinarioOrdenado()
    elementos_para_agregar = [5, 3, 7, 2, 4, 6, 8]
    
    for elemento in elementos_para_agregar:
        arbol.agregar_elemento(elemento)

    print("Recorrido Preorden:", arbol.recorrido_preorden())
    print("Recorrido Inorden:", arbol.recorrido_inorden())
    print("Recorrido Postorden:", arbol.recorrido_postorden())

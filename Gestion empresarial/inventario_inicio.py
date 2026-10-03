"""Ejercicio (30-45 min): cierre de inventario.

Completa las partes TODO. Un movimiento desconocido o que dejaría
existencias negativas se informa y se omite; se sigue con el siguiente.
No necesitas lanzar ni capturar excepciones.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class Movimiento:
    sku: str
    variacion: int


class Articulo:
    def __init__(self, sku: str, precio: float, existencias: int) -> None:
        # TODO: inicializar el objeto, recordad que existencias se supone privado.
        self._sku =sku
        self._precio = precio
        self._existencias = existencias

    @property
    def existencias(self) -> int:
        # TODO: devolver las existencias actuales.
        return self._existencias 
        

    @property
    def valor_en_almacen(self) -> float:
        # TODO: calcular precio * existencias.
        return self._precio * self._existencias

    def aplicar_variacion(self, variacion: int) -> bool:
        """Aplicar el cambio si el resultado no es negativo; indicar si se aplicó."""
        # TODO: comprobar antes de modificar _existencias.
        if (self.existencias+variacion >= 0):
            self.existencias = self.existencias+variacion
            return True
        return False

    def __repr__(self) -> str:
        # TODO: incluir SKU y existencias en una representación legible.
        return f"Articulo(sku='{self._sku}',existencias='{self._existencias}' )"


def procesar_movimientos(
    inventario: dict[str, Articulo], movimientos: list[Movimiento]
) -> list[str]:
    """Procesar en orden y devolver una incidencia por cada movimiento omitido."""
    # TODO: distinguir SKU desconocido y existencias insuficientes.
    rechazados: list[str] = []
    for  valor in movimientos:
        if valor.sku in inventario.keys() and Articulo.aplicar_variacion(valor.variacion) :
            print(f"Cambio realizado.")
        else:
            rechazados.append(valor.sku)
    return rechazados    




def skus_bajo_minimo(inventario: dict[str, Articulo], minimo: int) -> list[str]:
    """Devolver los SKU con existencias <= minimo usando list comprehension."""
    # TODO
    return[sku for sku, art in inventario.items() if art._existencias <=minimo ]


def valor_por_sku(inventario: dict[str, Articulo]) -> dict[str, float]:
    """Crear {sku: valor_en_almacen} usando dict comprehension."""
    # TODO
    return{sku: art.valor_en_almacen for sku, art in inventario.items()}


inventario = {
    "A-10": Articulo("A-10", 12.50, 8),
    "B-20": Articulo("B-20", 4.00, 3),
    "C-30": Articulo("C-30", 9.50, 6),
}

movimientos = [
    Movimiento("A-10", -4),
    Movimiento("B-20", +5),
    Movimiento("C-30", -7),
    Movimiento("X-99", +2),
    Movimiento("A-10", +1),
]

# Cuando termines, llama a las funciones e imprime las incidencias,
# las existencias finales, los SKU bajo mínimo (5) y el valor por SKU.
# 1. Procesar incidencias
incidencias = procesar_movimientos(inventario, movimientos)
print("--- Incidencias ---")
for inc in incidencias:
    print(f"- {inc}")

# 2. Existencias finales
print("\n--- Existencias Finales ---")
for art in inventario.values():
    print(art)

# 3. SKUs bajo mínimo (umbral: 5)
bajo_min = skus_bajo_minimo(inventario, 5)
print(f"\n--- SKUs con existencias <= 5 ---\n{bajo_min}")

# 4. Valor total almacenado por SKU
valores = valor_por_sku(inventario)
print(f"\n--- Valor en almacén por SKU ---\n{valores}")
 
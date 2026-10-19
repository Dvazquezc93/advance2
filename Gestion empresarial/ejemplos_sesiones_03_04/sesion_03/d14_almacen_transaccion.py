"""Guion S3, diapositiva 14: contrato y transacción simulada en memoria."""
from abc import ABC, abstractmethod
from types import TracebackType
from typing import Literal, Self, override


class RepositorioStock(ABC):
    @abstractmethod
    def reservar(self, sku: str, cantidad: int) -> None:
        raise NotImplementedError


class StockEnMemoria(RepositorioStock):
    def __init__(self, cantidades: dict[str, int]) -> None:
        self.cantidades: dict[str, int] = cantidades.copy()

    @override
    def reservar(self, sku: str, cantidad: int) -> None:
        if cantidad <= 0:
            raise ValueError('La cantidad debe ser positiva')
        disponible: int = self.cantidades.get(sku, 0)
        if sku not in self.cantidades or disponible < cantidad:
            raise ValueError('SKU inexistente o stock insuficiente')
        self.cantidades[sku] = disponible - cantidad
        print(f'Reservando {cantidad} unidades de {sku}')


class TransaccionEnMemoria:
    def __init__(self, almacen: StockEnMemoria) -> None:
        self.almacen: StockEnMemoria = almacen
        self.estado_anterior: dict[str, int] = {}

    def __enter__(self) -> Self:
        # Guardar una copia para poder deshacer las operaciones del bloque.
        self.estado_anterior = self.almacen.cantidades.copy()
        print('BEGIN simulado')
        return self

    def __exit__(self, exc_type: type[BaseException] | None,
                 exc_val: BaseException | None, exc_tb: TracebackType | None) -> Literal[False]:
        if exc_type is not None:
            self.almacen.cantidades = self.estado_anterior.copy()
            print(f'ROLLBACK simulado: {exc_val}')
        else:
            # Los cambios ya están en el diccionario: los conservamos.
            print('COMMIT simulado')
        return False  # Dejar que el código exterior reciba la excepción.


def main() -> None:
    almacen: StockEnMemoria = StockEnMemoria({'SKU-PORT-15': 10})
    repo: RepositorioStock = almacen
    with TransaccionEnMemoria(almacen):
        repo.reservar('SKU-PORT-15', 5)
    print('Tras COMMIT:', almacen.cantidades['SKU-PORT-15'])
    try:
        with TransaccionEnMemoria(almacen):
            repo.reservar('SKU-PORT-15', 2)
            repo.reservar('SKU-PORT-15', 99)
    except ValueError as error:
        print('Error recibido fuera del with:', error)
    print('Tras ROLLBACK, también se deshace la reserva de 2:', almacen.cantidades['SKU-PORT-15'])


if __name__ == '__main__':
    main()

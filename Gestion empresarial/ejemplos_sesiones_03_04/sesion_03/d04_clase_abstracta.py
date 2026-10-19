"""Guion S3, diapositiva 4: contrato de repositorio completamente tipado."""
from abc import ABC, abstractmethod
from inspect import isabstract
from typing import TypedDict


class DatosFactura(TypedDict):
    total: float


class RepositorioFacturas(ABC):
    @abstractmethod
    def guardar(self, factura_id: str, datos: DatosFactura) -> bool:
        raise NotImplementedError

    @abstractmethod
    def buscar_por_id(self, factura_id: str) -> DatosFactura | None:
        raise NotImplementedError


def main() -> None:
    print('No se puede instanciar el contrato:', isabstract(RepositorioFacturas))
    print('Operaciones pendientes:', sorted(RepositorioFacturas.__abstractmethods__))
    # RepositorioFacturas() sería un error estático y de ejecución.


if __name__ == '__main__':
    main()

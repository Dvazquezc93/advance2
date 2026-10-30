"""Guion S3, diapositiva 6: dos clases compatibles sin herencia común."""
from typing import Protocol


class Exportable(Protocol):
    def exportar(self) -> str: ...


class Factura:
    def exportar(self) -> str:
        return 'FAC-001;1200.00'


class Pedido:
    def exportar(self) -> str:
        return 'PED-001;5'


def mostrar(documento: Exportable) -> None:
    print(documento.exportar())


def main() -> None:
    mostrar(Factura())
    mostrar(Pedido())
    # mostrar(object()) no cumple el contrato: error estático y AttributeError.


if __name__ == '__main__':
    main()

"""Guion S3, diapositiva 3: una subclase incompleta sigue siendo abstracta."""
from abc import ABC, abstractmethod
from inspect import isabstract


class Exportador(ABC):
    @abstractmethod
    def exportar(self, texto: str) -> bytes:
        raise NotImplementedError


class ExportadorIncompleto(Exportador):
    pass


class ExportadorTexto(Exportador):
    def exportar(self, texto: str) -> bytes:
        return texto.encode('utf-8')


def main() -> None:
    print('Base abstracta:', isabstract(Exportador))
    print('Subclase incompleta:', isabstract(ExportadorIncompleto))
    # ExportadorIncompleto() provocaría TypeError y un error del analizador.
    exportador: Exportador = ExportadorTexto()
    print(exportador.exportar('Factura FAC-001'))


if __name__ == '__main__':
    main()

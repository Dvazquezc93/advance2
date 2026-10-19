"""Guion S3, diapositiva 8: comparación nominal y estructural."""
from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable


class ConectorBase(ABC):
    @abstractmethod
    def conectar(self) -> str:
        raise NotImplementedError

    def descripcion(self) -> str:
        return 'Método concreto compartido por herencia'


@runtime_checkable
class Conectable(Protocol):
    def conectar(self) -> str: ...


class AdaptadorExterno:
    def conectar(self) -> str:
        return 'Conectado (simulación)'


def usar(conector: Conectable) -> None:
    print(conector.conectar())


def main() -> None:
    adaptador: AdaptadorExterno = AdaptadorExterno()
    usar(adaptador)
    print('Hereda de ABC:', isinstance(adaptador, ConectorBase))
    print('Tiene miembros del Protocol:', isinstance(adaptador, Conectable))
    # runtime_checkable comprueba presencia, NO las firmas ni sus tipos.
    # Un Protocol también puede tener métodos concretos reutilizables por herencia.


if __name__ == '__main__':
    main()

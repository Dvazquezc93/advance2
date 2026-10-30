"""Guion S3, diapositiva 11: orden de enter, cuerpo y exit."""
from types import TracebackType
from typing import Literal, Self


class Recurso:
    def __enter__(self) -> Self:
        print('1. Preparar recurso')
        return self

    def __exit__(self, exc_type: type[BaseException] | None,
                 exc_val: BaseException | None, exc_tb: TracebackType | None) -> Literal[False]:
        print('3. Liberar recurso. Excepción:', exc_type)
        return False  # Propagar cualquier excepción del cuerpo.


def main() -> None:
    with Recurso():
        print('2. Ejecutar cuerpo')
    try:
        with Recurso():
            raise ValueError('Fallo controlado desde fuera')
    except ValueError as error:
        print('4.', error)
    # Si __enter__ falla, Python NO llama a __exit__ de ese gestor.


if __name__ == '__main__':
    main()

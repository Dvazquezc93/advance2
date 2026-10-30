"""Guion S3, diapositiva 12: COMMIT/ROLLBACK simulados, sin base de datos."""
from types import TracebackType
from typing import Literal, Self


class TransaccionBaseDatos:
    def __init__(self, conexion: str) -> None:
        self.conexion: str = conexion

    def __enter__(self) -> Self:
        print(f'BEGIN TRANSACTION en {self.conexion}')
        return self

    def __exit__(self, exc_type: type[BaseException] | None,
                 exc_val: BaseException | None, exc_tb: TracebackType | None) -> Literal[False]:
        if exc_type is not None:
            print(f'ROLLBACK debido a: {exc_val}')
        else:
            print('COMMIT TRANSACTION')
        return False


def main() -> None:
    with TransaccionBaseDatos('ERP_DEMO'):
        print('Registrar una factura')
    try:
        with TransaccionBaseDatos('ERP_DEMO'):
            raise ValueError('Stock insuficiente')
    except ValueError as error:
        print('La excepción se propagó:', error)


if __name__ == '__main__':
    main()

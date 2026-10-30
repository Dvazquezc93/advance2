"""Solución S3, diapositivas 15-16. La conexión y el SQL son simulados."""
from types import TracebackType
from typing import Literal, Self


class GestorConexionERP:
    def __init__(self, db_name: str) -> None:
        self.db_name: str = db_name

    def __enter__(self) -> Self:
        print(f'Conectando a {self.db_name}')
        return self

    def ejecutar(self, sql: str) -> None:
        print(f'Ejecutando SQL: {sql}')

    def __exit__(self, exc_type: type[BaseException] | None,
                 exc_val: BaseException | None, exc_tb: TracebackType | None) -> Literal[False]:
        print(f'Cerrando conexion con {self.db_name}')
        return False


def main() -> None:
    with GestorConexionERP('ERP_DEMO') as db:
        db.ejecutar('SELECT * FROM stock')
    try:
        with GestorConexionERP('ERP_DEMO') as db:
            db.ejecutar('UPDATE stock SET cantidad = 10 WHERE id = 1')
            raise ValueError('Error simulado')
    except ValueError as error:
        print('Error recibido fuera de with:', error)


if __name__ == '__main__':
    main()

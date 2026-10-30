"""Mini-reto S3, diapositiva 15. Completa los TODO sin cambiar las firmas.

1. Guardar db_name en el constructor.
2. enter: imprimir 'Conectando a {db_name}' y devolver self.
3. ejecutar: mostrar el SQL (simulación, sin ejecutar consultas reales).
4. exit: imprimir 'Cerrando conexion con {db_name}' y propagar errores.
5. Comprobar el cierre en la ejecución normal y tras la excepción.
"""
from types import TracebackType
from typing import Literal, Self


class GestorConexionERP:
    def __init__(self, db_name: str) -> None:
        # TODO: guardar el nombre.
        raise NotImplementedError('Completa __init__')

    def __enter__(self) -> Self:
        # TODO: mensaje de conexión y devolución.
        raise NotImplementedError('Completa __enter__')

    def ejecutar(self, sql: str) -> None:
        # TODO: mostrar la consulta.
        raise NotImplementedError('Completa ejecutar')

    def __exit__(self, exc_type: type[BaseException] | None,
                 exc_val: BaseException | None, exc_tb: TracebackType | None) -> Literal[False]:
        # TODO: mensaje de cierre y retorno que permita propagar la excepción.
        raise NotImplementedError('Completa __exit__')


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

"""Guion S3, diapositiva 13: un yield y limpieza en finally."""
from collections.abc import Generator
from contextlib import contextmanager


@contextmanager
def auditoria_operacion(modulo: str) -> Generator[None, None, None]:
    print(f'INICIO operación en {modulo}')
    try:
        yield
    finally:
        print(f'FIN operación en {modulo}')


def main() -> None:
    with auditoria_operacion('FACTURACIÓN'):
        print('Calculando libro de IVA (simulación)')
    try:
        with auditoria_operacion('ALMACÉN'):
            raise ValueError('Fallo de stock')
    except ValueError as error:
        print('El finally se ejecutó y el error se propagó:', error)


if __name__ == '__main__':
    main()

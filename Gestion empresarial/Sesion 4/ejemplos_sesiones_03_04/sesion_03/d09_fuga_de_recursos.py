"""Guion S3, diapositiva 9: cierre omitido al fallar antes de close()."""
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import TextIO


def main() -> None:
    with TemporaryDirectory() as carpeta:
        ruta: Path = Path(carpeta) / 'facturas.csv'
        archivo: TextIO = ruta.open('w', encoding='utf-8')
        try:
            try:
                archivo.write('id,total\n')
                raise ValueError('Fallo antes del cierre manual')
                # archivo.close() no se alcanzaría aquí.
            except ValueError as error:
                print(error)
                print('¿Se cerró el archivo?', archivo.closed)
        finally:
            # Limpieza de la demostración para no dejar una fuga real.
            archivo.close()
        print('Tras la limpieza:', archivo.closed)


if __name__ == '__main__':
    main()

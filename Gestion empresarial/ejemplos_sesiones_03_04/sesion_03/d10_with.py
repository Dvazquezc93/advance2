"""Guion S3, diapositiva 10: with cierra también cuando hay excepciones."""
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import TextIO


def main() -> None:
    with TemporaryDirectory() as carpeta:
        ruta: Path = Path(carpeta) / 'datos.txt'
        ruta.write_text('Factura FAC-001\n', encoding='utf-8')
        archivo: TextIO
        try:
            with ruta.open(encoding='utf-8') as archivo:
                linea: str = archivo.readline()
                print(linea.strip())
                raise ValueError('Error dentro de with')
        except ValueError as error:
            print(error)
        print('Archivo cerrado:', archivo.closed)


if __name__ == '__main__':
    main()

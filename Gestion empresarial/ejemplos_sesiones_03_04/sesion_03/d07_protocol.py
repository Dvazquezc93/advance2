"""Guion S3, diapositiva 7: contrato estructural para documentos imprimibles."""
from typing import Protocol


class Imprimible(Protocol):
    def generar_pdf(self) -> bytes: ...


class FacturaVenta:
    def generar_pdf(self) -> bytes:
        # Bytes de demostración. No constituyen un PDF válido completo.
        return b'%PDF-1.4 factura de venta...'


def enviar_por_email(documento: Imprimible) -> None:
    contenido: bytes = documento.generar_pdf()
    print(f'Simulación de envío: {len(contenido)} bytes')


def main() -> None:
    enviar_por_email(FacturaVenta())


if __name__ == '__main__':
    main()

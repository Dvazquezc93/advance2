"""Guion S3, diapositiva 5: implementación del contrato con datos en memoria."""
from typing import override
from d04_clase_abstracta import DatosFactura, RepositorioFacturas


class RepositorioFacturasEnMemoria(RepositorioFacturas):
    def __init__(self) -> None:
        self.facturas: dict[str, DatosFactura] = {}

    @override
    def guardar(self, factura_id: str, datos: DatosFactura) -> bool:
        # Copiar evita que el llamador modifique después los datos almacenados.
        self.facturas[factura_id] = datos.copy()
        print(f'Guardado en memoria: {factura_id}')
        return True

    @override
    def buscar_por_id(self, factura_id: str) -> DatosFactura | None:
        datos: DatosFactura | None = self.facturas.get(factura_id)
        if datos is None:
            return None
        return datos.copy()


def main() -> None:
    repo: RepositorioFacturas = RepositorioFacturasEnMemoria()
    print(repo.guardar('FAC-001', {'total': 1200.0}))
    print(repo.buscar_por_id('FAC-001'))
    print(repo.buscar_por_id('NO-EXISTE'))


if __name__ == '__main__':
    main()

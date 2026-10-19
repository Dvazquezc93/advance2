"""Guion S4, diapositiva 5: cálculo, exportación y almacenamiento separados."""


class CalculadorImpuestos:
    def calcular_total(self, base: float, tasa_iva: float = 21.0) -> float:
        return round(base * (1 + tasa_iva / 100), 2)


class ExportadorFacturaPDF:
    def generar_pdf(self, factura_id: str, total: float) -> bytes:
        # Simulación de contenido. No constituye un PDF válido completo.
        return f'%PDF-1.4 DEMO {factura_id}: {total:.2f}'.encode('utf-8')


class RepositorioFactura:
    def __init__(self) -> None:
        self.facturas: dict[str, float] = {}

    def guardar(self, factura_id: str, total: float) -> None:
        self.facturas[factura_id] = total


def main() -> None:
    calculador: CalculadorImpuestos = CalculadorImpuestos()
    exportador: ExportadorFacturaPDF = ExportadorFacturaPDF()
    repositorio: RepositorioFactura = RepositorioFactura()
    total: float = calculador.calcular_total(100.0)
    contenido: bytes = exportador.generar_pdf('FAC-001', total)
    repositorio.guardar('FAC-001', total)
    print('Total:', total)
    print('Documento simulado:', contenido)
    print('Datos guardados:', repositorio.facturas)
    # Cambiar la plantilla del exportador no afecta al cálculo de impuestos.


if __name__ == '__main__':
    main()

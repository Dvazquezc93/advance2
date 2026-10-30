from Facturacion.domain.dominio import Factura
from impuestos import CalculadorImpuesto
from Facturacion.infrastructure.persistencia import RepositorioFacturas
from notificaciones import NotificadorFactura

def emitir_factura(factura: Factura, calculador: CalculadorImpuesto,
                   repositorio: RepositorioFacturas,
                   notificador: NotificadorFactura | None = None) -> float:
    total = factura.calcular_total(calculador)
    repositorio.guardar(factura)
    if notificador is not None:
        notificador.notificar(factura, total)
    return total

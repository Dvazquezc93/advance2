from domain.dominio import Factura
from notificaciones import NotificadorFactura
from infrastructure.persistencia import RepositorioFacturas

def emitir_factura(factura: Factura, calculador:CalculadorImpuesto, repositorio: RepositorioFacturas, notificador: NotificadorFactura| None= None)-> ResultadoEmision:
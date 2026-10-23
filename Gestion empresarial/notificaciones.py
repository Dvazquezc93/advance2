from abc import ABC, abstractmethod

from dominio import Factura


class NotificadorFacturas(ABC):
    @abstractmethod
    def notificar(self, facturas: Factura, total:float)->None:
        ...
class ExportadorFacturas(ABC):
    @abstractmethod
    def exportar(self, factura:Factura)->str:
        ...

class NotificadorEmail(NotificadorFacturas):
    def __init__(self, destino:str)->None:
        self.destino =destino

    def notificar(self, factura:Factura, total:float):
        print(f"[Email Simulado] {self.destino}: {factura.numero}, {total:2f} EUR")
class ExportarTexto(ExportadorFacturas):
    def exportar(self, factura:Factura)->str:
        return f"{factura.numero} | {factura.cliente}|base: {factura.base_imponible:2f} EUR"
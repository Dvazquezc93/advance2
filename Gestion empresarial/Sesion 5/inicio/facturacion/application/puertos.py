from abc import ABC, abstractmethod

from facturacion.dominio.dominio import Factura

 

class RepositorioFactura(ABC):

    @abstractmethod

    def guardar(self, factura: Factura) -> None:

        ...

 

    @abstractmethod

    def buscar(self, numero: str) -> Factura | None:

        ...

class NotificadorFacturas(ABC):
    """Contrato abstracto para emisión de avisos y notificaciones."""

    @abstractmethod
    def notificar(self, factura: Factura, total: float) -> None:
        ...
class ExportadorFacturas(ABC):
    """Contrato abstracto para formateo o exportación de facturas."""

    @abstractmethod
    def exportar(self, factura: Factura) -> str:
        ...

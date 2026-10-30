"""Módulo de notificaciones y exportación (ISP / DIP).

Segrega las interfaces de comunicación y formateo, desacoplándolas del dominio.
"""
from abc import ABC, abstractmethod

from dominio import Factura


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


class NotificadorEmail(NotificadorFacturas):
    """Notificador simulado por correo electrónico (SMTP)."""

    def __init__(self, destino: str) -> None:
        self.destino = destino

    def notificar(self, factura: Factura, total: float) -> None:
        print(f"[Email Simulado] {self.destino}: Factura {factura.numero}, Total: {total:.2f} EUR")


class ExportarTexto(ExportadorFacturas):
    """Exportador simple a formato texto plano."""

    def exportar(self, factura: Factura) -> str:
        return f"{factura.numero} | {factura.cliente} | Base: {factura.base_imponible:.2f} EUR"

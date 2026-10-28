"""Módulo de dominio: entidades inmutables del negocio (SRP).

Contiene las dataclasses inmutables LineaFactura y Factura, libres de dependencias
de persistencia, interfaz gráfica o comunicación de red.
"""
from dataclasses import dataclass
from typing import Iterable

from identificadores import validar_cif
from impuestos import CalculadorImpuesto


@dataclass(frozen=True)
class LineaFactura:
    """Representa una línea comercial de una factura."""

    concepto: str
    unidades: int
    precio_unitario: float

    def __post_init__(self) -> None:
        if self.unidades <= 0:
            raise ValueError(
                f"Las unidades deben ser mayores a cero. Recibido: {self.unidades}"
            )
        if self.precio_unitario < 0:
            raise ValueError(
                f"El precio unitario no puede ser negativo. Recibido: {self.precio_unitario}"
            )

    @property
    def subtotal(self) -> float:
        """Subtotal de la línea redondeado a dos decimales."""
        return round(self.unidades * self.precio_unitario, 2)


@dataclass(frozen=True)
class Factura:
    """Entidad inmutable que representa una factura comercial."""

    numero: str
    cliente: str
    cif: str
    lineas: tuple[LineaFactura, ...]

    def __post_init__(self) -> None:
        # Asegurar conversión a tupla inmutable en caso de recibir otra secuencia/iterable
        if self.lineas is not None and not isinstance(self.lineas, tuple):
            object.__setattr__(self, 'lineas', tuple(self.lineas))

        # Validación del CIF mediante módulo especializado (SRP)
        validar_cif(self.cif)

        # Validación de campos obligatorios
        if not isinstance(self.numero, str) or not self.numero.strip():
            raise ValueError("El número de factura es obligatorio y no puede estar vacío.")

        if not isinstance(self.cliente, str) or not self.cliente.strip():
            raise ValueError("El nombre del cliente es obligatorio y no puede estar vacío.")

        if not self.lineas:
            raise ValueError("Factura sin líneas comerciales.")

    @property
    def base_imponible(self) -> float:
        """Calcula la suma de los subtotales de las líneas, redondeada a 2 decimales."""
        return round(sum(linea.subtotal for linea in self.lineas), 2)

    def calcular_total(self, calculador: CalculadorImpuesto) -> float:
        """Calcula el total (base + cuota de impuesto) aplicando OCP."""
        cuota = calculador.calcular_impuesto(self.base_imponible)
        return round(self.base_imponible + cuota, 2)

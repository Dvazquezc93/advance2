"""Módulo de cálculo de impuestos aplicando el principio Open/Closed (OCP).

Permite incorporar nuevos tipos impositivos creando nuevas clases derivadas
de CalculadorImpuesto sin necesidad de modificar el código existente.
"""
from abc import ABC, abstractmethod


class CalculadorImpuesto(ABC):
    """Contrato abstracto para el cálculo de cuotas de impuestos."""

    @abstractmethod
    def calcular_impuesto(self, base: float) -> float:
        """Calcula y devuelve la cuota del impuesto a partir de la base imponible."""
        ...


class ImpuestoGeneral(CalculadorImpuesto):
    """IVA general al 21%."""

    def calcular_impuesto(self, base: float) -> float:
        return round(base * 0.21, 2)


class ImpuestoReducido(CalculadorImpuesto):
    """IVA reducido al 10%."""

    def calcular_impuesto(self, base: float) -> float:
        return round(base * 0.10, 2)


class ImpuestoRecargo(CalculadorImpuesto):
    """IVA con recargo de equivalencia al 26,2% (21% + 5,2%)."""

    def calcular_impuesto(self, base: float) -> float:
        return round(base * 0.262, 2)


class ImpuestoExento(CalculadorImpuesto):
    """Régimen exento de IVA (cuota cero)."""

    def calcular_impuesto(self, base: float) -> float:
        return 0.0


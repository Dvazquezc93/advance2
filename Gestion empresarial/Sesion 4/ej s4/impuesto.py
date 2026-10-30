"""Módulo de impuestos (compatibilidad singular/plural y alias)."""
from impuestos import (
    CalculadorImpuesto,
    ImpuestoExento,
    ImpuestoGeneral,
    ImpuestoRecargo,
    ImpuestoReducido,
)

# Alias para mantener compatibilidad si se utilizó la grafía en minúscula
calculadorImpuesto = CalculadorImpuesto

__all__ = [
    'CalculadorImpuesto',
    'calculadorImpuesto',
    'ImpuestoGeneral',
    'ImpuestoReducido',
    'ImpuestoRecargo',
    'ImpuestoExento',
]

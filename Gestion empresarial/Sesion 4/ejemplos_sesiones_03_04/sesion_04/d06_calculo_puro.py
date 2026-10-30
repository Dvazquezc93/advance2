"""Guion S4, diapositiva 6: cálculo puro e inmutable, sin E/S."""
from dataclasses import dataclass


@dataclass(frozen=True)
class CalculadorFactura:
    tasa_iva: float = 21.0

    def calcular_total(self, base_imponible: float) -> float:
        if base_imponible < 0:
            raise ValueError('La base imponible no puede ser negativa')
        return round(base_imponible * (1 + self.tasa_iva / 100), 2)


def main() -> None:
    calculador: CalculadorFactura = CalculadorFactura()
    print('Base 100:', calculador.calcular_total(100.0))
    print('Base 0:', calculador.calcular_total(0.0))
    print('Misma entrada, mismo resultado:', calculador.calcular_total(100.0))
    try:
        calculador.calcular_total(-1.0)
    except ValueError as error:
        print('Validación:', error)
    # Se conserva float como en la diapositiva. Para dinero real, usar Decimal.


if __name__ == '__main__':
    main()

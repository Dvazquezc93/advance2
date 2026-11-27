from abc import ABC, abstractmethod
from decimal import Decimal


class EstrategiaDescuento(ABC):
    @abstractmethod
    def calcular(self, importe: Decimal) -> Decimal:
        pass


class SinDescuento(EstrategiaDescuento):
    def calcular(self, importe: Decimal) -> Decimal:
        return importe


class DescuentoPorcentaje(EstrategiaDescuento):
    def __init__(self, porcentaje: Decimal):
        if porcentaje < Decimal("0") or porcentaje > Decimal("100"):
            raise ValueError("El porcentaje debe estar entre 0 y 100")
        self.porcentaje = porcentaje

    def calcular(self, importe: Decimal) -> Decimal:
        return importe * (Decimal("1") - self.porcentaje / Decimal("100"))


class DescuentoFijo(EstrategiaDescuento):
    def __init__(self, importe: Decimal):
        if importe < 0:
            raise ValueError("El descuento no puede ser negativo")
        self.importe = importe

    def calcular(self, importe: Decimal) -> Decimal:
        return max(Decimal("0"), importe - self.importe)


class Pedido:
    def __init__(self, importe: Decimal, estrategia: EstrategiaDescuento):
        if importe < 0:
            raise ValueError("El importe no puede ser negativo")
        self.importe = importe
        self.estrategia = estrategia

    def total(self) -> Decimal:
        return self.estrategia.calcular(self.importe)


def main() -> None:
    pedidos = (
        Pedido(Decimal("200.00"), SinDescuento()),
        Pedido(Decimal("200.00"), DescuentoPorcentaje(Decimal("10"))),
        Pedido(Decimal("200.00"), DescuentoFijo(Decimal("25.50"))),
    )

    for pedido in pedidos:
        print(f"{pedido.total():.2f}")


if __name__ == "__main__":
    main()

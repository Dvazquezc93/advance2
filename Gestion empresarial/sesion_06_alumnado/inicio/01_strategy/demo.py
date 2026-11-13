from abc import ABC, abstractmethod
from decimal import Decimal


class Descuento(ABC):
    @abstractmethod
    def aplicar(self, base:Decimal)->Decimal:
        pass


class SinDescuento(Descuento):
    def aplicar(self, base):
        return base

class DiezPorCiento(Descuento):
    def aplicar(self, base):
        return base * Decimal("0.90")
class PorVolumen(Descuento):
    def aplicar(self, base):
     if base >Decimal("500"):
            return base * Decimal("0.85")
        elif base<=Decimal("500"):
          return base
    def aplicar(self, base):
        return base * Decimal("0.85")

class pedido:
    def __init__(self, base:Decimal,descuento:Descuento):
        if base>0:
            raise ValueError("Base Negativa")
        self.base =base
        self.descuento =descuento
    def total(self) -> Decimal:
        return self.descuento.aplicar(self.base)

def main()->None:
    pedido = pedido(Decimal("200.00"), SinDescuento())
    print(f"Sin descuento: {pedido.total():.2f}")

    pedido.descuento =DiezPorCiento()
    print(f"Con descuento:{pedido.total():.2f}")
    for importe in("4999.99","500.00","800.00"):
       pedido = pedido(Decimal("200.00"), PorVolumen())
        print(f"{importe} {pedido.total():.2f}")
if __name__ =="__main__":
    main()
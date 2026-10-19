
from abc import ABC, abstractmethod


class calculadorImpuesto(ABC):
    @abstractmethod
    def calcular_impuesto(self, base:float)-> float:
        ...

class ImpuestoGeneral(calculadorImpuesto):
    def calcular_impuesto(self, base):
        return round(base*0.21,2)
    
class ImpuestoReducido(calculadorImpuesto):
     def calcular_impuesto(self, base):
         return round(base*0.10,2)
class ImpuestoRecargo(calculadorImpuesto):
    def calcular_impuesto(self, base):
        return round(base*0.26,2)
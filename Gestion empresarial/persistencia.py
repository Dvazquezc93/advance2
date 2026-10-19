from abc import ABC, abstractmethod
from dominio import factura

class RepositorioFactura(ABC):
    @abstractmethod
    def guardar(self, factura:factura)->None:
        ...
    @abstractmethod
    def busca(self, numero:str)-> factura |None:
        ...
class repositoriMemoria(RepositorioFactura):
    def __init__(self)->None:
        self.facturas:dict[str,factura]={}

    def guardar(self,facturas:factura)->None:
        self._facturas[factura.numero]=factura
    def buscar(self, numero:str)-> factura | None :
        return self.facturas.get(numero)
class RepositorioLista(RepositorioFactura):
        def __init__(self):
            self._facturas:list[factura]=[]
        def guardar(self, facturas:factura):
            self._facturas=[f for f in self._facturas if f.numero != facturas.numero]
            self.facturas.append(factura)
        def buscar(self, numero:str)-> factura | None :
            self.facturas.           
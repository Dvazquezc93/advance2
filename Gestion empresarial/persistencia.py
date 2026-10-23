from abc import ABC, abstractmethod

from dominio import Factura


class RepositorioFactura(ABC):
    @abstractmethod
    def guardar(self, factura:Factura)->None:
        ...
    @abstractmethod
    def buscar(self, numero:str)-> Factura |None:
        ...
class RepositoriMemoria(RepositorioFactura):
    def __init__(self)->None:
        self.facturas:dict[str,Factura]={}

    def guardar(self,facturas:Factura)->None:
        self._facturas[facturas.numero]=facturas
    def buscar(self, numero:str)-> Factura | None :
        return self.facturas.get(numero)
class RepositorioLista(RepositorioFactura):
        def __init__(self):
            self._facturas:list[Factura]=[]
        def guardar(self, facturas:Factura)->None:
            self._facturas=[f for f in self._facturas if f.numero != facturas.numero]
            self.facturas.append(facturas)
            print(self.factura)
        def buscar(self, numero:str)-> Factura | None :
            for factura in self._facturas:
                if factura.numero ==numero:
                    return factura
            return None           
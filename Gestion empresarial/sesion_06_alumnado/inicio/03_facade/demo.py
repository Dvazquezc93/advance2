from decimal import Decimal


class catalogo:
    def peso(self,producto:str)-> Decimal:
        return{"teclado":2,"raton":1}[producto]

class Tarificador:
    def coste(self, peso:int)-> Decimal:
        return Decimal(peso)* Decimal("2.00")

class Etiquetador:
    def crear(self, producto:str,coste:Decimal)->str:
        return f"{producto}: portes {coste:.2f} EUR"

class FachadaEnvios:
    def __init__(self, catalogo:catalogo, tarificador:Tarificador, etiquetador:Etiquetador):
        self.catalogo =catalogo
        self.tarificador =tarificador
        self.etiquetador =etiquetador

    def preparador_envio(self, producto:str)->str:
        peso= self.catalogo.peso(producto)
        coste = self.tarificador.coste(peso)
        return self.etiquetador.crear(producto, coste)
class FachadaConsulta:
    def __init__(self, catalogo:catalogo, tarificador:Tarificador, etiquetador:Etiquetador):
            self.catalogo =catalogo
            self.tarificador =tarificador
            self.etiquetador =etiquetador
    def consultar(self,producto:str)->dict:
            peso= self.catalogo.peso(producto)
            coste = self.tarificador.coste(peso)
            etiqueta =self.etiquetador.crear(producto, coste)
            return{
                 "producto":producto,
                 "peso":peso,
                 "coste":coste,
                 "etiqueta":etiqueta
            }
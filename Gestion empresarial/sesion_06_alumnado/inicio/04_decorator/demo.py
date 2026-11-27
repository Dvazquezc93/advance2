from abc import ABC, abstractmethod



class Emisor(ABC):
    def emitir(self, numero:str)->str:
        pass
class EmisorBasico(Emisor):
    def emitir(self, numero:str)->str:
        if not numero.strip():
            raise ValueError("numero Vacio")
        return f"Emitida {numero}"

class DecoradorBasico(Emisor):
    def __init__(self, interior:Emisor):
        self.interior =interior

    def emitir(self, numero:str)->str:
        return self.interio.emitir(numero)

class ConRegistro(DecoradorBasico):
    def __init__(self, interior:Emisor, registros:list[str]):
        super().__init__(interior)
        self.registros =registros
    def emitir(self, numero):
        self.registros.append(f"INICIO{numero}")
        resultado = super().emitir(numero)
        self.registros.append(f"FIN {numero}")
        return resultado

class ConContador(DecoradorBasico):
    def __init__(self, interior:Emisor, registros:list[str]):
            super().__init__(interior)
            self.registros =registros
def main()->None:
    registros :list[str]=[]
    emisor = ConRegistro[EmisorBasico(), registros]
    print(emisor.emitir("F-001"))
    print(registros)

if __name__ == "__main__":
    main()

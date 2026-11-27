from decimal import Decimal


class Catalogo:
    _PESOS = {"teclado": 2, "raton": 1, "monitor": 5}

    def peso(self, producto: str) -> int:
        try:
            return self._PESOS[producto]
        except KeyError:
            raise ValueError("Producto desconocido")


class Tarificador:
    TARIFA_POR_KILO = Decimal("2.00")

    def coste(self, peso: int) -> Decimal:
        return Decimal(peso) * self.TARIFA_POR_KILO


class Etiquetador:
    def crear(self, producto: str, coste: Decimal) -> str:
        return f"{producto}: portes {coste:.2f} EUR"


class FachadaEnvios:
    def __init__(
        self,
        catalogo: Catalogo,
        tarificador: Tarificador,
        etiquetador: Etiquetador,
    ):
        self.catalogo = catalogo
        self.tarificador = tarificador
        self.etiquetador = etiquetador

    def preparar_envio(self, producto: str) -> str:
        peso = self.catalogo.peso(producto)
        coste = self.tarificador.coste(peso)
        return self.etiquetador.crear(producto, coste)


def main() -> None:
    fachada = FachadaEnvios(Catalogo(), Tarificador(), Etiquetador())
    print(fachada.preparar_envio("teclado"))
    print(fachada.preparar_envio("raton"))
    print(fachada.preparar_envio("monitor"))


if __name__ == "__main__":
    main()

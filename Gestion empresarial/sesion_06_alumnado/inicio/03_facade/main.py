from demo import catalogo, Tarificador, Etiquetador, FachadaConsulta


def main() -> None:
    fachada = FachadaConsulta(catalogo(), Tarificador(), Etiquetador())
    consulta = fachada.consultar("teclado")
    print(consulta)

if __name__ == "__main__":
    main()

"""Guion S4, diapositiva 3: localizar responsabilidades mezcladas.

Ejemplo del antipatrón. SQL, PDF y correo se muestran por consola.
"""


class ServicioFacturaMonolitico:
    def procesar_factura(self, cliente_id: str, importes: list[float]) -> None:
        # Persistencia: esta cadena NO se ejecuta. No usar SQL interpolado real.
        print(f'Simulación SQL: SELECT * FROM clientes WHERE id = {cliente_id}')
        # Dominio: cálculo mezclado con infraestructura.
        total: float = sum(importes) * 1.21
        # Presentación y comunicación también están en el mismo método.
        print(f'Simulación PDF para total: {total:.2f}')
        print(f'Simulación de correo al cliente {cliente_id}')


def main() -> None:
    servicio: ServicioFacturaMonolitico = ServicioFacturaMonolitico()
    servicio.procesar_factura('CLI-001', [100.0, 50.0])
    print('Pregunta: ¿qué habría que modificar si cambia el diseño del PDF?')


if __name__ == '__main__':
    main()

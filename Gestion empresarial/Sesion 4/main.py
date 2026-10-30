"""Punto de entrada de la aplicación de facturación refactorizada.

Demuestra la aplicación de los principios SOLID:
- S (SRP): Entidades puras y validación segregada.
- O (OCP): Ampliación de cálculos de impuestos sin modificar Factura.
- L (LSP): Sustitución de implementaciones de repositorio (Memoria y Lista).
"""
from dominio import Factura, LineaFactura
from impuestos import (
    CalculadorImpuesto,
    ImpuestoExento,
    ImpuestoGeneral,
    ImpuestoRecargo,
    ImpuestoReducido,
)
from notificaciones import ExportarTexto, NotificadorEmail
from persistencia import RepositorioFacturas, RepositorioLista, RepositorioMemoria


def probar_validaciones_dominio() -> None:
    """Comprueba que las reglas de validación de dominio rechazan datos inválidos (SRP)."""
    print("\n--- 1. Comprobación de Validaciones de Dominio (SRP) ---")

    # a) Factura sin líneas
    try:
        Factura("F-000", "Cliente Test", "B12345678", ())
        assert False, "Debería haber fallado por factura sin líneas"
    except ValueError as e:
        print(f"[OK] Rechazada factura sin líneas: {e}")

    # b) Línea con unidades cero
    try:
        LineaFactura("Concepto Inválido", 0, 100.0)
        assert False, "Debería haber fallado por unidades <= 0"
    except ValueError as e:
        print(f"[OK] Rechazada línea con 0 unidades: {e}")

    # c) CIF incorrecto
    try:
        validar_cif_invalido = Factura(
            "F-000",
            "Cliente Test",
            "Z99999999",
            (LineaFactura("Licencia", 1, 100.0),),
        )
        assert False, "Debería haber fallado por CIF incorrecto"
    except ValueError as e:
        print(f"[OK] Rechazado CIF incorrecto: {e}")

    # d) Cliente vacío o en blanco
    try:
        Factura(
            "F-000",
            "   ",
            "B12345678",
            (LineaFactura("Licencia", 1, 100.0),),
        )
        assert False, "Debería haber fallado por cliente en blanco"
    except ValueError as e:
        print(f"[OK] Rechazado cliente en blanco: {e}")


def probar_calculos_impuestos(factura: Factura) -> None:
    """Comprueba los diferentes tipos de impuestos sin modificar Factura (OCP)."""
    print("\n--- 2. Comprobación de Cálculos de Impuestos (OCP) ---")
    casos: list[tuple[CalculadorImpuesto, float]] = [
        (ImpuestoGeneral(), 2420.00),
        (ImpuestoReducido(), 2200.00),
        (ImpuestoRecargo(), 2524.00),
        (ImpuestoExento(), 2000.00),
    ]

    for calculador, total_esperado in casos:
        total = factura.calcular_total(calculador)
        assert total == total_esperado, f"Esperado {total_esperado}, obtenido {total}"
        print(f"{type(calculador).__name__:<18}: {total:.2f} EUR")


def probar_repositorios(factura_original: Factura, factura_reemplazo: Factura) -> None:
    """Comprueba el comportamiento idéntico de los repositorios (LSP).

    Ambos deben cumplir el contrato de RepositorioFacturas:
    - Ausencia: devuelve None si no existe.
    - Guardar y recuperar: persiste y localiza por número.
    - Reemplazar: actualiza la entidad si el número coincide.
    """
    print("\n--- 3. Comprobación de Persistencia y Sustitución de Liskov (LSP) ---")
    repositorios: list[RepositorioFacturas] = [
        RepositorioMemoria(),
        RepositorioLista(),
    ]

    for repo in repositorios:
        nombre_repo = type(repo).__name__

        # 1. Ausencia
        assert repo.buscar("F-001") is None, f"{nombre_repo}: no debería encontrar 'F-001'"

        # 2. Guardar
        repo.guardar(factura_original)

        # 3. Recuperar
        recuperada = repo.buscar("F-001")
        assert recuperada is not None, f"{nombre_repo}: debe encontrar 'F-001'"
        assert recuperada.cliente == "Comercial Aula SL"

        # 4. Reemplazar por otra factura con mismo número y distinto cliente
        repo.guardar(factura_reemplazo)
        actualizada = repo.buscar("F-001")
        assert actualizada is not None
        assert actualizada.cliente == "Comercial Aula Modificada SL"

        print(f"[OK] {nombre_repo} cumple el contrato LSP (ausencia, guardado, reemplazo).")


def main() -> None:
    # -------------------------------------------------------------
    # 1. S (SRP): Construcción de la factura común del taller
    # -------------------------------------------------------------
    lineas = (
        LineaFactura(concepto="Licencia ERP", unidades=1, precio_unitario=1500.0),
        LineaFactura(concepto="Soporte", unidades=2, precio_unitario=250.0),
    )
    factura = Factura(
        numero="F-001",
        cliente="Comercial Aula SL",
        cif="B12345678",
        lineas=lineas,
    )

    print("=== Taller SGE · Sesión 4 de Python: Principios SOLID ===")
    print(f"Factura: {factura.numero} | Cliente: {factura.cliente} | CIF: {factura.cif}")
    print(f"Base Imponible: {factura.base_imponible:.2f} EUR")
    assert factura.base_imponible == 2000.00, "La base imponible debe ser 2000.00 EUR"

    # Validaciones defensivas de dominio
    probar_validaciones_dominio()

    # -------------------------------------------------------------
    # 2. O (OCP): Ampliación de cálculos de impuestos
    # -------------------------------------------------------------
    probar_calculos_impuestos(factura)

    # -------------------------------------------------------------
    # 3. L (LSP): Repositorios intercambiables
    # -------------------------------------------------------------
    factura_reemplazo = Factura(
        numero="F-001",
        cliente="Comercial Aula Modificada SL",
        cif="B12345678",
        lineas=lineas,
    )
    probar_repositorios(factura, factura_reemplazo)

    # -------------------------------------------------------------
    # 4. Notificaciones y exportación desacopladas (ISP / DIP)
    # -------------------------------------------------------------
    print("\n--- 4. Notificación y Exportación Desacopladas ---")
    notificador = NotificadorEmail(destino="aula@example.com")
    total_general = factura.calcular_total(ImpuestoGeneral())
    notificador.notificar(factura, total_general)

    exportador = ExportarTexto()
    print("Exportación texto:", exportador.exportar(factura))


if __name__ == "__main__":
    main()

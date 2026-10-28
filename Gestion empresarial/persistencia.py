"""Módulo de persistencia aplicando el principio de sustitución de Liskov (LSP).

Define el contrato RepositorioFacturas y dos implementaciones intercambiables:
RepositorioMemoria (usando un diccionario) y RepositorioLista (usando una lista).
"""
from abc import ABC, abstractmethod

from dominio import Factura


class RepositorioFacturas(ABC):
    """Contrato abstracto para la persistencia de facturas."""

    @abstractmethod
    def guardar(self, factura: Factura) -> None:
        """Guarda la factura; si ya existe una con el mismo número, la reemplaza."""
        ...

    @abstractmethod
    def buscar(self, numero: str) -> Factura | None:
        """Busca una factura por su número identificador. Devuelve None si no existe."""
        ...


class RepositorioMemoria(RepositorioFacturas):
    """Implementación del repositorio basada en un diccionario interno."""

    def __init__(self) -> None:
        self._facturas: dict[str, Factura] = {}

    def guardar(self, factura: Factura) -> None:
        self._facturas[factura.numero] = factura

    def buscar(self, numero: str) -> Factura | None:
        return self._facturas.get(numero)


class RepositorioLista(RepositorioFacturas):
    """Implementación del repositorio basada en una lista interna.

    Cumple rigurosamente el contrato de RepositorioFacturas (LSP),
    siendo totalmente intercambiable con RepositorioMemoria.
    """

    def __init__(self) -> None:
        self._facturas: list[Factura] = []

    def guardar(self, factura: Factura) -> None:
        # Filtra los números distintos antes de añadir (reemplazo)
        self._facturas = [f for f in self._facturas if f.numero != factura.numero]
        self._facturas.append(factura)

    def buscar(self, numero: str) -> Factura | None:
        for f in self._facturas:
            if f.numero == numero:
                return f
        return None


# Alias para compatibilidad con variaciones en singular o nombres previos
RepositorioFactura = RepositorioFacturas
RepositoriMemoria = RepositorioMemoria

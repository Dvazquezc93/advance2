"""Módulo de identificadores y validaciones fiscales didácticas.

Responsabilidad única (SRP): validar identificadores como el CIF.
"""


def validar_cif(cif: str) -> None:
    """Valida un CIF según las reglas didácticas del taller.

    Debe comenzar por 'A' o 'B' y tener una longitud total de 9 caracteres
    donde los 8 restantes son dígitos numéricos.
    """
    if not isinstance(cif, str):
        raise ValueError("El CIF debe ser una cadena de texto.")

    cif_limpio = cif.strip()
    if (
        len(cif_limpio) != 9
        or not cif_limpio.startswith(('A', 'B'))
        or not cif_limpio[1:].isdigit()
    ):
        raise ValueError(
            f"CIF no válido para el taller: '{cif}'. "
            "Se espera 'A' o 'B' seguido de 8 dígitos numéricos."
        )


ventas = [
    {"id": "PEDE-01", "Total": 1250.0},
    {"id": "PEDE-02", "Total": 80.0},
    {"id": "PEDE-03", "Total": 3500.0},
    {"id": "PEDE-04", "Total": 100.0},
    {"id": "PEDE-02", "Total": 220.0},
]

def pedidos_relevantes(datos: list[dict], umbral: float) -> list[str]:
    return [str(v['id']) for v in datos if float(v['Total']) > umbral]

def indexar_por_id(datos: list[dict]) -> dict[str, float]:
    # Nota: si hay IDs repetidos (como 'PEDE-02'), se conservará el último valor
    return {str(v['id']): float(v['Total']) for v in datos}

resultado = pedidos_relevantes(ventas, 220)
print(resultado)  # Salida: ['PEDE-01', 'PEDE-03']

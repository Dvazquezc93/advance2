from facturacion.application.resultado import ResultadoEmision

def presentar_emision(resultado:ResultadoEmision)->str:
    return  f"Emitida {resultado.numero}: {resultado.total:.2F}"
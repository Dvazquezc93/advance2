from facturacion.domain.entidades import Factura

def convertirfactura(datos:dict)->Factura:
    if datos is dict:
        raise ValueError("no es un diccionario")
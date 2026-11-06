import json
from facturacion.domain.impuestos import CalculadorImpuesto
from facturacion.application.puertos import RepositorioFactura, NotificadorFacturas
from facturacion.application.casos_usos import emitir_factura
from .conversion import convertir_factura
from .presentacion import presentar_emision

def emitir_desde_json(texto:str, calculador:CalculadorImpuesto,
                      repositorio: RepositorioFactura,
                        notificador:NotificadorFacturas|None )->str:
    datos = json.load(texto)
    factura =convertir_factura(datos)
    resultado = emitir_factura(factura, calculador,repositorio, notificador)
    return presentar_emision(resultado)
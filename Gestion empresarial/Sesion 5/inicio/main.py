from facturacion.domain.entidades import Factura,
from facturacion.domain.identificadores import validar_cif
from facturacion.domain.impuestos import  CalculadorImpuesto, ImpuestoGeneral, ImpuestoRecargo, ImpuestoReducido

def main():
    factura= Factura('F-001, C')
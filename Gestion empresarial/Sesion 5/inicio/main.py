from facturacion.domain.entidades import Factura
from facturacion.domain.identificadores import validar_cif
from facturacion.domain.impuestos import  CalculadorImpuesto, ImpuestoGeneral, ImpuestoRecargo, ImpuestoReducido
from facturacion.infrastructure.respositorios import RepositorioMemoria
from facturacion.infrastructure.notificaciones import NotificadorEmail
from facturacion.application.casos_usos import emitir_factura, consultar_factura

def main():
    factura= Factura('F-001, Comerial Aula SL', 'B12345678',(
        LineaFactura('LicenciaERP',1,1500.0),
        LineaFactura('Soporte',2,250.0),
    ))
    repo =RepositorioMemoria()
    resultado = emitir_factura(factura, ImpuestoRecargo, repo, NotificadorEmail('info@example.com'))
    assert resultado.total ==2524.0
    assert repo.buscar(factura.numero)== factura

    try:
        consultar_factura(" ",repo)
    except ValueError:
        print("Numero vacion:valueError esperado")
    else:
        raise AssertionError("La consulta con nombre vacio no debia llegar aqui")
    try:
        consultar_factura("AUSENTE", repo)
    except LookupError:
        print("Consulta factura AUSENTE: LookupError esperado")
    else:
        raise AssertionError("La consulta debia fallar")

    if __name__ =='__main__':
        main()
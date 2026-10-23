from dominio import Factura, LineaFactura
from impuesto import ImpuestoGeneral, ImpuestoRecargo, ImpuestoReducido
from persistencia import RepositoriMemoria, RepositorioLista


def main() ->None:
    factura = Factura('F-001','Comercial Aula SL', 'B12345678',{
        LineaFactura('Licencia ERP', 1, 1500.0),
        LineaFactura('Soporte', 2, 250.0),
    })
    factura2 = Factura('F-001','mi empresa SL', 'B12345678',{
            LineaFactura('Licencia ERP', 1, 1500.0),
            LineaFactura('Soporte', 2, 250.0),
        })
    for calculador, esperado in ((ImpuestoGeneral(),2420.0),
                                 (ImpuestoReducido(),2200.0), (ImpuestoRecargo(),2524.0)):
        total = factura.calcular_total(calculador)
        assert total ==esperado
        print(f'{type(calculador).__name__}: {total:.2f}')

    for repo in (RepositorioLista(), RepositoriMemoria()):
        repo.guardar(factura)
        print(repo.buscar(factura))
        repo.guardar(factura2)
        print(repo.buscar(factura2))


if __name__ =='__main__':
          main()
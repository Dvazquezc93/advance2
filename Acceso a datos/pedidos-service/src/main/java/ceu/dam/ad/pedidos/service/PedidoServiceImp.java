package ceu.dam.ad.pedidos.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;


import ceu.dam.ad.pedidos.dao.PedidoRepository;
import ceu.dam.ad.pedidos.model.ArticuloPedido;
import ceu.dam.ad.pedidos.model.Pedido;
import jakarta.transaction.Transactional;
@Service
public class PedidoServiceImp implements PedidoService {
	@Autowired
	private PedidoRepository repoP;

	@Override
	public Pedido consultarPedido(Long idPedido) throws PedidoException, PedidoNotFoundException {
		try {
			Optional<Pedido> pedido = repoP.findById(idPedido);

			return pedido
					.orElseThrow(() -> new PedidoNotFoundException("No existe el pedido con ese id " + idPedido));
			
		} catch (DataAccessException e) {
			throw new PedidoException("Error con buscando en la base de datos", e);
		}

	}

	@Override
	@Transactional
	public Pedido crearPedido(Pedido pedido) throws PedidoException {
		try {
			//BigDecimal sumaExenta = pedido.getArticulos().stream().filter(a -> a.getExentoIva())
			//		.map(a -> a.getPrecioSinIva()).reduce(BigDecimal.ZERO, BigDecimal::add);
			//BigDecimal sumaNoExenta = pedido.getArticulos().stream().filter(a -> !a.getExentoIva())
				//	.map(a -> a.getPrecioSinIva()).reduce(BigDecimal.ZERO, BigDecimal::add);
			//BigDecimal subTotal = sumaExenta.add(sumaNoExenta);
			//BigDecimal total = subTotal.multiply(BigDecimal.valueOf(1.21));
			//BigDecimal impuestos = total.multiply(BigDecimal.valueOf(1.21));
			
			List<ArticuloPedido> lista = pedido.getArticulos();
			BigDecimal subTotal = BigDecimal.ZERO;
			BigDecimal total = BigDecimal.ZERO;
			
			for (ArticuloPedido articuloPedido : lista) {
				
				if (articuloPedido.getExentoIva()) {
					// subtotal
					subTotal = subTotal.add(articuloPedido.getPrecioSinIva());
					// subtotal
					total = total.add(articuloPedido.getPrecioSinIva());
				} else {
					// subtotal
					subTotal = subTotal.add(articuloPedido.getPrecioSinIva());
					// total

					total = total.add(articuloPedido.getPrecioSinIva().multiply(BigDecimal.valueOf(1.21)));
				}
			}
			pedido.setSubtotal(subTotal);
			pedido.setTotal(total);
			pedido.setImpuestos(total.subtract(subTotal));
			return repoP.save(pedido);
			
			

		} catch (DataAccessException e) {
			throw new PedidoException("Error creando en la base de datos", e);

		}

	}

	@Override
	public List<Long> buscarPedidosArticulo(String codBarras) throws PedidoException, PedidoNotFoundException {
		 try {
			 List<Long> pedido = repoP.findByArticulosCodBarras(codBarras).stream().map(a->a.getIdPedido()).distinct().toList();
			 if (pedido.isEmpty()) {
				throw new PedidoNotFoundException("No existe el pedido con ese codigo de barras " + codBarras);
			}
			 return pedido;
		} catch (DataAccessException e) {
			throw new PedidoException("Error creando en la base de datos", e);
		}
	}

}

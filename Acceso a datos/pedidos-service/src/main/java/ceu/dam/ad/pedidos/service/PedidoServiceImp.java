package ceu.dam.ad.pedidos.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import ceu.dam.ad.pedidos.PedidosServiceApplication;
import ceu.dam.ad.pedidos.dao.ArticuloPedidoRepository;
import ceu.dam.ad.pedidos.dao.PedidoRepository;
import ceu.dam.ad.pedidos.model.ArticuloPedido;
import ceu.dam.ad.pedidos.model.Pedido;

public class PedidoServiceImp implements PedidoService {
	@Autowired
	private PedidoRepository repoP;
	private ArticuloPedidoRepository repoA;

	@Override
	public Pedido consultarPedido(Long idPedido) throws PedidoException, PedidoNotFoundException {
		try {
			Optional<Pedido> pedido = repoP.findById(idPedido);

			Pedido pedidoC = pedido
					.orElseThrow(() -> new PedidoNotFoundException("No existe el pedido con ese id " + idPedido));
			List<ArticuloPedido> lista = repoA.findByIdPedido(idPedido);
			pedidoC.setArticulos(lista);
			return pedidoC;
		} catch (DataAccessException e) {
			throw new PedidoException("Error con buscando en la base de datos", e);
		}

	}

	@Override
	public Pedido crearPedido(Pedido pedido) throws PedidoException {
		try {
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

					total = articuloPedido.getPrecioSinIva().multiply(BigDecimal.valueOf(1.21));
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
		// TODO Auto-generated method stub
		return null;
	}

}

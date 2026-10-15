package ceu.dam.ad.pedidos.test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import ceu.dam.ad.pedidos.model.ArticuloPedido;
import ceu.dam.ad.pedidos.model.Pedido;
import ceu.dam.ad.pedidos.service.PedidoException;
import ceu.dam.ad.pedidos.service.PedidoNotFoundException;
import ceu.dam.ad.pedidos.service.PedidoService;
@Component
public class TestPedido {
	final PedidoService service;
	public TestPedido(PedidoService service) {
		this.service= service;
	}
public void testConsultar(Long idPedido) {
	try {
		Pedido pedido = service.consultarPedido(idPedido);
		System.out.println(pedido);
	} catch (PedidoException | PedidoNotFoundException  e) {
		e.printStackTrace();
	}
}
public void testCrear() {
	try {
		Pedido nuevo = service.crearPedido(damePedido());
		System.out.println(nuevo);
	} catch (PedidoException  e) {
		e.printStackTrace();
	}
}

private Pedido damePedido() {
	Pedido p = new Pedido();
	p.setDniCliente("1111111X");
	p.setFechaPedido(LocalDate.now());
	List<ArticuloPedido> articulos = new ArrayList<>();
	p.setArticulos(articulos);
	for (int i = 1; i <= 3; i++) {
		ArticuloPedido a = new ArticuloPedido();
		a.setCodBarras("COD" + i);
		a.setDescripcionArticulo("Artículo " + i);
		a.setExentoIva(i%2==0);
		a.setPrecioSinIva(BigDecimal.valueOf(10*i));
		articulos.add(a);
	}
	return p;
	
}
}
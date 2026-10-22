package ceu.dam.ad.pedidos.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.dam.ad.pedidos.model.Pedido;
import java.util.List;
import ceu.dam.ad.pedidos.model.ArticuloPedido;


public interface PedidoRepository extends JpaRepository<Pedido, Long> {
List<Pedido> findByArticulosCodBarras(String codBarras);
}

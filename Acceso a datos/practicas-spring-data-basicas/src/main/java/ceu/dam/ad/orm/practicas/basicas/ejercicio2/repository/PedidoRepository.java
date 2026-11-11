package ceu.dam.ad.orm.practicas.basicas.ejercicio2.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.dam.ad.orm.practicas.basicas.ejercicio2.model.Pedido;
import java.util.List;
import ceu.dam.ad.orm.practicas.basicas.ejercicio2.model.PedidoLinea;


public interface PedidoRepository extends JpaRepository<Pedido, UUID>  {
List<Pedido> findByLineasArticuloDescripcion(String descripcion);
}

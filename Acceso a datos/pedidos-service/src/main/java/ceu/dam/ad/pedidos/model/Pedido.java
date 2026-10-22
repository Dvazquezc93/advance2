 package ceu.dam.ad.pedidos.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Data
@Entity
@Table(name = "pedido")
public class Pedido {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "id")
	private Long idPedido;
	@Column(name = "fecha")
	private LocalDate fechaPedido;
	@Column(name = "cliente")
	private String dniCliente;
	private BigDecimal total;
	private BigDecimal subtotal;
	private BigDecimal impuestos;
	@OneToMany(cascade =CascadeType.ALL, fetch =FetchType.EAGER)
	@JoinColumn(name="id_pedido", nullable =false)
	private List<ArticuloPedido> articulos;
	
	

}

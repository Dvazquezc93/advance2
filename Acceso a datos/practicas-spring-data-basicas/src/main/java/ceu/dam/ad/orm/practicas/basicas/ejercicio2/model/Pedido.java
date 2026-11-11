package ceu.dam.ad.orm.practicas.basicas.ejercicio2.model;

import java.awt.Window.Type;
import java.sql.Types;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
@Data
@Entity
public class Pedido {
	@Id
	@GeneratedValue
	@JdbcTypeCode(Types.VARCHAR)
	@Column(name ="uuid_pedido")
	private UUID uidPedido;
	
	@ManyToOne( fetch= FetchType.EAGER)
	@JoinColumn(name ="dni_cliente")
	private Cliente cliente;
	
	private Date fecha;
	@OneToMany( fetch= FetchType.EAGER)
	@JoinColumn(name ="uuid_pedido")
	private List<PedidoLinea> lineas;
	


	@Override
	public String toString() {
		return "Pedido [uidPedido=" + uidPedido + ", fecha=" + fecha + ", lineas=" + lineas + "]";
	}
	
	
	
}

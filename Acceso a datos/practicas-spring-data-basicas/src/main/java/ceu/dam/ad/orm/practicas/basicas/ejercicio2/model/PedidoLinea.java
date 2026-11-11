package ceu.dam.ad.orm.practicas.basicas.ejercicio2.model;

import java.sql.Types;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name="pedido_lineas")
public class PedidoLinea {
	@Id
	@GeneratedValue
	@JdbcTypeCode(Types.VARCHAR)
	private UUID uidLinea;
	private Integer numLinea;
	private Integer cantidad;
	@ManyToOne
	@JoinColumn(name ="id_articulo")
	private Articulo articulo;

	
	@Override
	public String toString() {
		return "PedidoLinea [uidLinea=" + uidLinea + ", numLinea=" + numLinea + ", cantidad=" + cantidad + ", articulo="
				+ articulo + "]";
	}

	

	
}

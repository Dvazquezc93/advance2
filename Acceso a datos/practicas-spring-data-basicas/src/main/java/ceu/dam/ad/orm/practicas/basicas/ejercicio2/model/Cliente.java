package ceu.dam.ad.orm.practicas.basicas.ejercicio2.model;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Data
@Entity
public class Cliente {
	@Id
	private String dni;
	private String nombre;
	private String apellidos;
	@OneToMany
	@JoinColumn(name="dni_cliente")
	private Set<Pedido> pedidos;
	

	@Override
	public String toString() {
		return "Cliente [dni=" + dni + ", nombre=" + nombre + ", apellidos=" + apellidos + "]";
	}
	
	
	
}

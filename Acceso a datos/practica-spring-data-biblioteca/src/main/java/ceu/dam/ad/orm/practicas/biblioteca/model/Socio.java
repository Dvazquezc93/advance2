package ceu.dam.ad.orm.practicas.biblioteca.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
@Entity
public class Socio {
	@Id
	private String dni;
	private String nombre;
	private String apellidos;
	@OneToOne(mappedBy = "socio",cascade = CascadeType.ALL, fetch= FetchType.EAGER)
	private Carnet carnet;
	@OneToMany(mappedBy = "socio",fetch= FetchType.EAGER)
	private List<Prestamo> prestamos;

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public Carnet getCarnet() {
		return carnet;
	}

	public void setCarnet(Carnet carnet) {
		this.carnet = carnet;
	}

	public List<Prestamo> getPrestamos() {
		return prestamos;
	}

	public void setPrestamos(List<Prestamo> prestamos) {
		this.prestamos = prestamos;
	}

	@Override
	public String toString() {
		return "Socio [dni=" + dni + ", nombre=" + nombre + ", apellidos=" + apellidos + ", carnet=" + carnet + ", prestamos="
				+ prestamos + "]";
	}

}

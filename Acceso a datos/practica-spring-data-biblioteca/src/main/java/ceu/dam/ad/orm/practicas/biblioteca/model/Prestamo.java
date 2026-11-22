package ceu.dam.ad.orm.practicas.biblioteca.model;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
@Entity
@IdClass(PrestamoKey.class)
public class Prestamo {
	@Id
	private Integer anio;
	@Id
	private Integer numPrestamo;
	@ManyToOne
	@JoinColumn(name="dni_socio", nullable = false)
	private Socio socio;
	@ManyToOne()
	@JoinColumn(name = "id_libro",nullable = false)
	private Libro libro;
	private LocalDate fechaPrestamo;
	private LocalDate fechaDevolucion;

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public Integer getNumPrestamo() {
		return numPrestamo;
	}

	public void setNumPrestamo(Integer numPrestamo) {
		this.numPrestamo = numPrestamo;
	}

	public Socio getSocio() {
		return socio;
	}

	public void setSocio(Socio socio) {
		this.socio = socio;
	}

	public Libro getLibro() {
		return libro;
	}

	public void setLibro(Libro libro) {
		this.libro = libro;
	}

	public LocalDate getFechaPrestamo() {
		return fechaPrestamo;
	}

	public void setFechaPrestamo(LocalDate fechaPrestamo) {
		this.fechaPrestamo = fechaPrestamo;
	}

	public LocalDate getFechaDevolucion() {
		return fechaDevolucion;
	}

	public void setFechaDevolucion(LocalDate fechaDevolucion) {
		this.fechaDevolucion = fechaDevolucion;
	}

	@Override
	public String toString() {
		return "Prestamo [anio=" + anio + ", numPrestamo=" + numPrestamo + ", libro=" + libro + ", fechaPrestamo="
				+ fechaPrestamo + ", fechaDevolucion=" + fechaDevolucion + "]";
	}

}

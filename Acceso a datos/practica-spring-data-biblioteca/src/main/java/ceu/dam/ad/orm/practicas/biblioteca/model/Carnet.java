package ceu.dam.ad.orm.practicas.biblioteca.model;

import java.sql.Types;
import java.time.LocalDate;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
@Entity
public class Carnet {
	@Id
	@GeneratedValue
	@JdbcTypeCode(Types.VARCHAR)
	@Column(name = "uuid_carnet")
	private UUID id;
	@OneToOne
	@JoinColumn(name="dni_socio", nullable = false)
	private Socio socio;
	private LocalDate fechaAlta;
	private LocalDate fechaCaducidad;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Socio getSocio() {
		return socio;
	}

	public void setSocio(Socio socio) {
		this.socio = socio;
	}

	public LocalDate getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(LocalDate fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	public LocalDate getFechaCaducidad() {
		return fechaCaducidad;
	}

	public void setFechaCaducidad(LocalDate fechaCaducidad) {
		this.fechaCaducidad = fechaCaducidad;
	}

	@Override
	public String toString() {
		return "Carnet [id=" + id + ", fechaAlta=" + fechaAlta + ", fechaCaducidad=" + fechaCaducidad + "]";
	}

}

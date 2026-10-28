package ceu.dam.ad.orm.practicas.basicas.ejercicio1.model;

import java.util.Date;
import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
public class Serie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id;
	private String descripcion;
	private Date estreno;
	@OneToOne
	@JoinColumn(name="id_trailer")
	private Trailer trailer;
	@OneToMany
	@JoinColumn(name ="id_temporada")
	private List<Temporada> temporadas;



}

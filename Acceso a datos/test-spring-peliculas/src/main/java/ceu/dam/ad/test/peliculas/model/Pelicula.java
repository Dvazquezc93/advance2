package ceu.dam.ad.test.peliculas.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Data
@Entity
@Table(name = "peliculas")
public class Pelicula {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "título")
	private String titulo;
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) // cascade no select fetch select lazy anula
	@JoinColumn(name = "id_director", nullable = false)
	private Director director;
	@Column(name = "duración")
	private Integer duracion;

	@Column(name = "año_estreno")
	private Integer anoEstreno;

	@Transient
	private Integer edad;
	
	@OneToOne
	@JoinColumn(name="cod_estreno")
	private Estreno estreno;
	@ManyToMany
	@JoinTable(name="pelicula_actores", joinColumns = {@JoinColumn(name="id_actor")},
	 inverseJoinColumns = {@JoinColumn(name ="id_peliculas")})
	private List<Actor> actores;

}

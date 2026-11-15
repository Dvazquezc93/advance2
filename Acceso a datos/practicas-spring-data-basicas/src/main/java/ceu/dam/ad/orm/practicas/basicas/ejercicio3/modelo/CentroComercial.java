package ceu.dam.ad.orm.practicas.basicas.ejercicio3.modelo;

import java.sql.Types;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.Columns;
import org.hibernate.annotations.JdbcTypeCode;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
@Entity
public class CentroComercial {
	@Id
	@GeneratedValue
	@JdbcTypeCode(Types.VARCHAR)
	@Column(name ="uuid_centro")
	private UUID id;
	@Column( name="nombre_comercial")
	private String nombre;
	
	private String direccion;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="cod_pais")
	private Pais pais;
	
	@OneToMany(fetch=FetchType.EAGER)
	@JoinColumn(name="uuid_centro")
	private List<Tienda> tiendas;
	
	@ManyToMany(fetch=FetchType.EAGER, cascade =CascadeType.ALL)
	@JoinTable(name ="Centro_comercial_marcas",
	joinColumns= {@JoinColumn(name="uuid_centro")},
	inverseJoinColumns= {@JoinColumn(name ="cod_marca")})
	private List<Marca> marcas;

	
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public Pais getPais() {
		return pais;
	}
	public void setPais(Pais pais) {
		this.pais = pais;
	}
	public List<Tienda> getTiendas() {
		return tiendas;
	}
	public void setTiendas(List<Tienda> tiendas) {
		this.tiendas = tiendas;
	}
	public List<Marca> getMarcas() {
		return marcas;
	}
	public void setMarcas(List<Marca> marcas) {
		this.marcas = marcas;
	}
	@Override
	public String toString() {
		String x = "[id=" + id + ", nombre=" + nombre + ", direccion=" + direccion + ", pais=" + pais + "]";
		x+= "\n\tMarcas:";
		for (Marca marca : marcas) {
			x+= "\n\t\t" + marca;
		}
		x+= "\n\tTiendas:";
		for (Tienda tienda : tiendas) {
			x+= "\n\t\t" + tienda;
		}
		return x;
	}
	
	
	
	 
	

}

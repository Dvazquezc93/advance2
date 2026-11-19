package ceu.dam.ad.orm.practicas.basicas.ejercicio3.modelo;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Pais {
	@Id
	@Column(name ="cod_pais")
	private String codigo;
	private String descripcion;
	
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	@Override
	public String toString() {
		return codigo + " - " + descripcion;
	}
	
	
	
	

}

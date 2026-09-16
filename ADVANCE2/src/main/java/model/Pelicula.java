package model;

public class Pelicula {
 private Integer id;
 private String titulo;
 private String direccion;
 private Integer añoEstreno;
 private Integer duracion;
 
 public Integer getId() {
	return id;
 }
 public void setId(Integer id) {
	this.id = id;
 }
 public String getTitulo() {
	return titulo;
 }
 public void setTitulo(String titulo) {
	this.titulo = titulo;
 }
 public String getDireccion() {
	return direccion;
 }
 public void setDireccion(String direccion) {
	this.direccion = direccion;
 }
 public Integer getAñoEstreno() {
	return añoEstreno;
 }
 public void setAñoEstreno(Integer añoEstreno) {
	this.añoEstreno = añoEstreno;
 }
 public Integer getDuracion() {
	return duracion;
 }
 public void setDuracion(Integer duracion) {
	this.duracion = duracion;
 }
 
}

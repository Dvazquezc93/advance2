package ceu.dam.ad.orm.practicas.biblioteca.dto.request;

import java.util.List;


import jakarta.validation.constraints.NotBlank;

public class SocioRequestDto {
	@NotBlank
	private String dni;
	@NotBlank
	private String nombre;
	@NotBlank
	private String apellidos;


}

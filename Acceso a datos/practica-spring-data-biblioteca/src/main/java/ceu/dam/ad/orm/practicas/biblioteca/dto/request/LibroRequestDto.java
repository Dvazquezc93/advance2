package ceu.dam.ad.orm.practicas.biblioteca.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class LibroRequestDto {
	@Size(min=13, max=13)
	private String isbn;
	@NotBlank
	private String titulo;
	@NotBlank
	private String autor;
	private String genero;
	@Positive
	private Integer ejemplaresDisponibles;

}

package ceu.dam.psp.examen.dto.request;

import java.time.LocalDate;
import java.util.List;

import ceu.dam.psp.examen.model.Articulo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class CrearUsuarioRequestDto {
	@NotBlank
	@Size(max=30)
	private String identificador;
	@NotBlank
	private String descripcion;
	@NotBlank
	@Size(min=10)
	private String contraseña;
	
}

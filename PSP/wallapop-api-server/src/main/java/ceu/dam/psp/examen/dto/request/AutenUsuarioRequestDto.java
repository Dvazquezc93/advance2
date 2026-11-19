package ceu.dam.psp.examen.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AutenUsuarioRequestDto {
	@NotBlank
	private String identificador;
	@NotBlank
	private String contraseña;
}

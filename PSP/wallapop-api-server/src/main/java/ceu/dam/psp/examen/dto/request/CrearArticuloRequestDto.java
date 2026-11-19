package ceu.dam.psp.examen.dto.request;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class CrearArticuloRequestDto {
	@NotBlank
	@Size(max=30)
	private String nombre;
	@NotBlank
	private String detalles;
	@NotNull
	@Min(1)
	private Double precio;
	@NotBlank
	@Size(max=30)
	private String categoria;
	@NotBlank(message="")
	private String idPropietario;
	private LocalDate fechaPublicacion;
	private Integer estado;
}

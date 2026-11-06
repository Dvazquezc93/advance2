package ceu.envios.api.server.Dto.Request;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class EstadoLoteRequestDto {
	@NotEmpty
	private List<String> codigos;
	@NotBlank
	private String nuevoEstado;

}

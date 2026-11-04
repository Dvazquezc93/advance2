package ceu.envios.api.server.Dto.Request;

import java.util.List;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class EstadoLoteRequestDto {

	private List<String> codigos;
	private String nuevoEstado;

}

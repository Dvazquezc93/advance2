package ceu.envios.api.server.Dto.Request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import lombok.Data;
@Data
public class EnvioRequestDto {

	private String codigoSeguimiento;
	private LocalDateTime fechaRegistro;
	private BigDecimal pesoKg;
	private String estado;
	private BigDecimal temperaturaCelsius;
}

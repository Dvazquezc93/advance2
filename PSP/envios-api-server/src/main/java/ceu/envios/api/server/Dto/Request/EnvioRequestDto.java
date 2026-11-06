package ceu.envios.api.server.Dto.Request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class EnvioRequestDto {
	
	private String codigoSeguimiento;
	private BigDecimal pesoKg;
	private String estado;
	private BigDecimal temperaturaCelsius;
}

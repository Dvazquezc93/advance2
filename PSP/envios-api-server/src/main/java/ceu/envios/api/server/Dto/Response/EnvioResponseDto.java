package ceu.envios.api.server.Dto.Response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;
@Data
public class EnvioResponseDto {
	private LocalDateTime fechaRegistro;
	private String codigoSeguimiento;
	private BigDecimal pesoKg;
	private String estado;
	private BigDecimal temperaturaCelsius;

}

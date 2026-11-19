package ceu.dam.psp.padel.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class PartidoRequestDto {
	@FutureOrPresent
	private LocalDate fecha;
	@Min(8)
	@Max(22)
	private Integer hora;
	@NotNull
	private Boolean individuales;
}

package ceu.dam.psp.padel.dto.response;

import java.time.LocalDate;

import ceu.dam.psp.padel.model.Jugador;
import lombok.Data;
@Data
public class PartidoResponseDto {
	private String codigo;
    private LocalDate fecha;
    private Integer hora;
    private Boolean individuales;
    private Jugador organizador; 
}

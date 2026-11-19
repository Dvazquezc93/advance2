package ceu.dam.psp.examen.dto.response;

import java.time.LocalDate;
import java.util.List;


import lombok.Data;
@Data
public class UsuarioResponseDto {
	
	private String identificador;
	private String descripcion;
	private LocalDate fechaAlta;
	private LocalDate fechaUltimoAcceso;
	private List<ArticuloResponseDto> catalogo;
}

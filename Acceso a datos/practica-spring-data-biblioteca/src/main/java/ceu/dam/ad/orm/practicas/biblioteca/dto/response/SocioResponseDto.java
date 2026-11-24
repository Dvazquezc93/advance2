package ceu.dam.ad.orm.practicas.biblioteca.dto.response;

import java.util.UUID;

import ceu.dam.ad.orm.practicas.biblioteca.model.Carnet;
import lombok.Data;
@Data
public class SocioResponseDto {
	private String dni;
	private String nombre;
	private String apellidos;
	private UUID uuidCarnet;
}

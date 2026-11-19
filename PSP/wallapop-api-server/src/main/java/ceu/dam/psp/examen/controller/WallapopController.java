package ceu.dam.psp.examen.controller;

import java.time.LocalDate;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ceu.dam.psp.examen.dto.request.AutenUsuarioRequestDto;
import ceu.dam.psp.examen.dto.request.CrearArticuloRequestDto;
import ceu.dam.psp.examen.dto.request.CrearUsuarioRequestDto;

import ceu.dam.psp.examen.dto.response.ArticuloResponseDto;

import ceu.dam.psp.examen.dto.response.UsuarioResponseDto;
import ceu.dam.psp.examen.exceptions.ErrorPagoException;
import ceu.dam.psp.examen.exceptions.NoAutorizadoException;
import ceu.dam.psp.examen.exceptions.NoExisteException;
import ceu.dam.psp.examen.exceptions.UsuarioDuplicadoException;
import ceu.dam.psp.examen.model.Articulo;
import ceu.dam.psp.examen.model.Usuario;
import ceu.dam.psp.examen.service.WallapopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RequestMapping("/wallapop")
@RestController
@SecurityRequirement(name="ApiKeyAuth")
public class WallapopController {
	private final WallapopService service;

	WallapopController(WallapopService service) {
		this.service = service;
	}

	@PostMapping("/usuarios")
	public UsuarioResponseDto crearUsuario(@Valid @RequestBody CrearUsuarioRequestDto usuario)
			throws UsuarioDuplicadoException {
		return new ModelMapper().map(
				service.crearUsuario(usuario.getIdentificador(), usuario.getDescripcion(), DigestUtils.sha512_224Hex(usuario.getContraseña())),
				UsuarioResponseDto.class);
	}

	@PostMapping("/login")
	public UsuarioResponseDto autenticarUsuario(@Valid @RequestBody AutenUsuarioRequestDto usuario)
			throws NoAutorizadoException {
		
		return new ModelMapper().map(service.autenticarUsuario(usuario.getIdentificador(),DigestUtils.sha512_224Hex(usuario.getContraseña())),
				UsuarioResponseDto.class);
	}

	@GetMapping("/usuarios/{identificador}")
	public UsuarioResponseDto consultarUsuario(@Valid @PathVariable String identificador) throws NoExisteException {
		return new ModelMapper().map(service.consultarUsuario(identificador), UsuarioResponseDto.class);
	}

	@PostMapping("/articulos")
	@Operation(summary = "Registrar nuevo articulo", description = "Crea un nuevo artículo en el service ")
	public UsuarioResponseDto crearArticulo(@Valid @RequestBody CrearArticuloRequestDto articulo)
			throws NoExisteException {
		Usuario user = service.consultarUsuario(articulo.getIdPropietario());
		articulo.setFechaPublicacion(LocalDate.now());
		articulo.setEstado(1);
		return new ModelMapper().map(service.crearArticulo(new ModelMapper().map(articulo, Articulo.class)),
				UsuarioResponseDto.class);

	}

	@GetMapping("/usuarios/buscar")
	public List<ArticuloResponseDto> buscarArticulos(@RequestParam(required = false)String filtro,
			@RequestParam(required = false) @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate filtroFechaAltaMinima) {
		List<Articulo> art = service.buscarArticulos(filtro, filtro,
				filtroFechaAltaMinima);
		return art.stream().map(a -> new ModelMapper().map(a, ArticuloResponseDto.class)).toList();
	}

	@GetMapping("/articulos/{codigo}")
	public ArticuloResponseDto consultarArticulo(@PathVariable Long codigo) throws NoExisteException {
		return new ModelMapper().map(service.consultarArticulo(codigo), ArticuloResponseDto.class);
	}

	@PutMapping("/articulos/{codigo}/comprar")
	public void comprarArticulo(@PathVariable Long codigo) throws ErrorPagoException {
		service.comprarArticulo(codigo);

	}

	
}

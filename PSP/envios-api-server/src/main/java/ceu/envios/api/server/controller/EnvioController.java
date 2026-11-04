package ceu.envios.api.server.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ceu.envios.api.server.Dto.Request.EnvioRequestDto;
import ceu.envios.api.server.Dto.Request.EstadoLoteRequestDto;
import ceu.envios.api.server.Dto.Response.EnvioResponseDto;
import ceu.envios.api.server.model.Envio;
import ceu.envios.api.server.service.EnvioNoEncontradoException;
import ceu.envios.api.server.service.EnviosService;
import ceu.envios.api.server.service.EstadoEnvioInvalidoException;
import ceu.envios.api.server.service.IllegalArgumentException;
import ceu.envios.api.server.service.PoliticaTransporteInvalidaException;
import lombok.RequiredArgsConstructor;

@RequestMapping("/envio")
@RestController

public class EnvioController {

	 private final EnviosService service;
	private final ModelMapper mapper;


	@GetMapping("/temperatura")
	public List<EnvioResponseDto> detectarEnviosEnRiesgoTermico(@RequestParam double limiteTemperatura)
			throws IllegalArgumentException {

		return service.detectarEnviosEnRiesgoTermico(limiteTemperatura).stream()
				.map(e -> mapper.map(e, EnvioResponseDto.class)).toList();
	}

	@PutMapping
	public long actualizarEstadoLoteReciente(@RequestBody EstadoLoteRequestDto estado)
			throws EnvioNoEncontradoException, IllegalArgumentException {
		return service.actualizarEstadoLoteReciente(estado.getCodigos(), estado.getNuevoEstado());
	}

	@PostMapping
	public EnvioResponseDto registrarNuevoEnvio(EnvioRequestDto nuevoEnvio)
			throws PoliticaTransporteInvalidaException, EstadoEnvioInvalidoException {
		return mapper.map(service.registrarNuevoEnvio(mapper.map(nuevoEnvio, Envio.class)), EnvioResponseDto.class);
	}

	@GetMapping
	public EnvioResponseDto obtenerEnvioPesadoPrioritario() throws EstadoEnvioInvalidoException {
		return mapper.map(service.obtenerEnvioPesadoPrioritario(), EnvioResponseDto.class);
	}

}

package ceu.dam.psp.padel.controller;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ceu.dam.psp.padel.dto.request.JugadorRequestDto;
import ceu.dam.psp.padel.dto.request.PartidoRequestDto;
import ceu.dam.psp.padel.dto.response.JugadorResponseDto;
import ceu.dam.psp.padel.dto.response.PartidoResponseDto;
import ceu.dam.psp.padel.exceptions.PadelInvalidException;
import ceu.dam.psp.padel.exceptions.PadelNotFoundException;
import ceu.dam.psp.padel.model.Jugador;
import ceu.dam.psp.padel.model.Partido;
import ceu.dam.psp.padel.service.JugadorFiltro;
import ceu.dam.psp.padel.service.PadelService;
import jakarta.validation.Valid;

@RequestMapping("/api/")
public class PadelController {
	@Autowired
	private PadelService service;

	@GetMapping("/partidos")
	public List<PartidoResponseDto> consultarProximosPartidos() {
		List<Partido> partidos = service.consultarProximosPartidos();
		return partidos.stream().map(p -> new ModelMapper().map(p, PartidoResponseDto.class)).toList();
	}

	@GetMapping("/partidos/{codigo}")
	public PartidoResponseDto consultarPartido(@PathVariable String codigo) throws PadelNotFoundException {
		return new ModelMapper().map(service.consultarPartido(codigo), PartidoResponseDto.class);
	}

	@GetMapping("/jugadores/{idJugador}")
	public JugadorResponseDto consultarJugador(@PathVariable Long idJugador) throws PadelNotFoundException {
		// TODO Auto-generated method stub
		return new ModelMapper().map(service.consultarJugador(idJugador),JugadorResponseDto.class );
	}
	@PostMapping("/Jugadores")
	public JugadorResponseDto crearJugador(@Valid @RequestBody JugadorRequestDto jugador) throws PadelInvalidException {
		Jugador j = service.crearJugador(new ModelMapper().map(jugador, Jugador.class));
		if (j.getNivel().equalsIgnoreCase("PRINCIPIANTE")||j.getNivel().equalsIgnoreCase("INTERMEDIO")||j.getNivel().equalsIgnoreCase("AVANZADO")) {
			j.setNivel(j.getNivel().toUpperCase());
			return new ModelMapper().map( j, JugadorResponseDto.class);
		}
		throw new PadelInvalidException("El nivel del jugador no es correcto"); 
	}
	@PostMapping("/jugadores/{idOrganizador}/partidos")
	public String crearPartido(@Valid @RequestBody PartidoRequestDto partido, @PathVariable Long idOrganizador) throws PadelNotFoundException {
			Jugador j= service.consultarJugador(idOrganizador);
			if (partido.getFecha().equals(null)) {
				partido.setFecha(LocalDate.now());
			}
			Partido p=service.crearPartido(partido.getFecha(), partido.getHora(), partido.getIndividuales(), idOrganizador);
		return p.getCodigo();
	}
	@PutMapping("/patidosdos/{idJugador}/jugadores/{codigo}")
	public List<PartidoResponseDto> addJugador(@PathVariable Long idJugador, @PathVariable String codigo) throws PadelNotFoundException, PadelInvalidException {
		Partido p =service.consultarPartido(codigo);
		Jugador j = service.consultarJugador(idJugador);
		if (p.getJugadores().contains(j)) {
			throw new PadelInvalidException("El jugador ya esta en ese partido");
		}
		else if ((p.getIndividuales() && p.getJugadores().size()==2)||(!p.getIndividuales() && p.getJugadores().size()==4)) {
			throw new PadelInvalidException("El partido esta completo");
		}
		p.getJugadores().add(j);
		 service.actualizarJugadoresPartido(codigo, p.getJugadores());
		 List<Jugador> ju = p.getJugadores();
		 return  ju.stream().map(j-> new ModelMapper().map(j, JugadorResponseDto.class)).toList();
	}

	public List<Jugador> buscarJugadores(JugadorFiltro filtro) {
		// TODO Auto-generated method stub
		return null;
	}

}

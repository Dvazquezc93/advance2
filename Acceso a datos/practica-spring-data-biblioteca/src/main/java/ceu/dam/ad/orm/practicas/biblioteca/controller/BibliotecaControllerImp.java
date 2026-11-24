package ceu.dam.ad.orm.practicas.biblioteca.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ceu.dam.ad.orm.practicas.biblioteca.dto.request.LibroRequestDto;
import ceu.dam.ad.orm.practicas.biblioteca.dto.request.SocioRequestDto;
import ceu.dam.ad.orm.practicas.biblioteca.dto.response.SocioResponseDto;
import ceu.dam.ad.orm.practicas.biblioteca.model.Carnet;
import ceu.dam.ad.orm.practicas.biblioteca.model.Libro;
import ceu.dam.ad.orm.practicas.biblioteca.model.Prestamo;
import ceu.dam.ad.orm.practicas.biblioteca.model.Socio;
import ceu.dam.ad.orm.practicas.biblioteca.service.BibliotecaException;

import ceu.dam.ad.orm.practicas.biblioteca.service.BibliotecaServiceImpl;
import ceu.dam.ad.orm.practicas.biblioteca.service.NotFoundException;
import jakarta.validation.Valid;

@RequestMapping("/api/biblioteca/")
@RestController
public class BibliotecaControllerImp   {
	@Autowired
	private  BibliotecaServiceImpl service;
	
	@PostMapping("/socio")
	public SocioResponseDto altaSocio(@Valid @RequestBody SocioRequestDto socio) throws BibliotecaException {
			Socio s =service.altaSocio(new ModelMapper().map(socio, Socio.class));
			SocioResponseDto s2 = new ModelMapper().map(s, SocioResponseDto.class);
			s2.setUuidCarnet(s.getCarnet().getId());
			return s2;
	}
	@GetMapping("/socio/{dni}")
	public SocioResponseDto consultarSocio(@PathVariable String dni) throws NotFoundException {
		return new ModelMapper().map(service.consultarSocio(dni),SocioResponseDto.class);
	}
	@PostMapping("/libro")
	public Libro altaLibro(@Valid @RequestBody LibroRequestDto libro) throws BibliotecaException {
		retu
		return null;
	}

	public List<Libro> buscarLibros(Libro ejemplo) {
		// TODO Auto-generated method stub
		return null;
	}

	public Prestamo prestarLibro(String dniSocio, Long idLibro) throws NotFoundException, BibliotecaException {
		// TODO Auto-generated method stub
		return null;
	}

	public void devolverLibro(Integer anio, Integer numPrestamo) throws NotFoundException, BibliotecaException {
		// TODO Auto-generated method stub
		
	}

	public Carnet renovarCarnet(String dniSocio) throws NotFoundException, BibliotecaException {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Prestamo> consultarPrestamosActivos(String dniSocio) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	

}

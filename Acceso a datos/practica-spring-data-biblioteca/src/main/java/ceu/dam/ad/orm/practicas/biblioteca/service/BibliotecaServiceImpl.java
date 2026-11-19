package ceu.dam.ad.orm.practicas.biblioteca.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.ExampleMatcher;

import ceu.dam.ad.orm.practicas.biblioteca.model.Carnet;
import ceu.dam.ad.orm.practicas.biblioteca.model.Libro;
import ceu.dam.ad.orm.practicas.biblioteca.model.Prestamo;
import ceu.dam.ad.orm.practicas.biblioteca.model.Socio;
import ceu.dam.ad.orm.practicas.biblioteca.repository.LibroRepository;
import ceu.dam.ad.orm.practicas.biblioteca.repository.SocioRepository;

public class BibliotecaServiceImpl implements BibliotecaService {
	
	@Autowired
	private SocioRepository repoS;
	@Autowired
	private LibroRepository repoL;

	@Override
	public Socio altaSocio(Socio socio) throws BibliotecaException {
			if (repoS.findById(socio.getDni())==null) {
				throw new BibliotecaException("ya existe ese socio con ese dni");
			}
			socio.getCarnet().setFechaAlta(LocalDate.now());
			socio.getCarnet().setFechaAlta(LocalDate.now().plusYears(1));
			return repoS.save(socio);
	
	}

	@Override
	public Socio consultarSocio(String dni) throws NotFoundException {
		return repoS.findById(dni).orElseThrow(()-> new NotFoundException("No existe ese socio en la BBDD"));
	}

	@Override
	public Libro altaLibro(Libro libro) throws BibliotecaException {
		List<Libro> libros =repoL.findByIsbn(libro.getIsbn());
		if (libros.isEmpty()) {
			throw new BibliotecaException("ya existe ese libro con ese ISBN");
		}
		return repoL.save(libro);
	}

	@Override
	public List<Libro> buscarLibros(Libro ejemplo) {
		ExampleMatcher matcher =ExampleMatcher.matching().withIgnoreCase()
		return null;
		// TODO: IMPLEMENTAR POR EL ALUMNO...
	}

	@Override
	public Prestamo prestarLibro(String dniSocio, Long idLibro) throws NotFoundException, BibliotecaException {
		return null;
		// TODO: IMPLEMENTAR POR EL ALUMNO...
	}

	@Override
	public void devolverLibro(Integer anio, Integer numPrestamo) throws NotFoundException, BibliotecaException {
		// TODO: IMPLEMENTAR POR EL ALUMNO...
	}

	@Override
	public Carnet renovarCarnet(String dniSocio) throws NotFoundException, BibliotecaException {
		return null;
		// TODO: IMPLEMENTAR POR EL ALUMNO...
	}

	@Override
	public List<Prestamo> consultarPrestamosActivos(String dniSocio) throws NotFoundException {
		return null;
		// TODO: IMPLEMENTAR POR EL ALUMNO...
	}

}

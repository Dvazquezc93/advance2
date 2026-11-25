package ceu.dam.ad.orm.practicas.biblioteca.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;

import ceu.dam.ad.orm.practicas.biblioteca.model.Carnet;
import ceu.dam.ad.orm.practicas.biblioteca.model.Libro;
import ceu.dam.ad.orm.practicas.biblioteca.model.Prestamo;
import ceu.dam.ad.orm.practicas.biblioteca.model.PrestamoKey;
import ceu.dam.ad.orm.practicas.biblioteca.model.Socio;
import ceu.dam.ad.orm.practicas.biblioteca.repository.CarnetRepository;
import ceu.dam.ad.orm.practicas.biblioteca.repository.LibroRepository;
import ceu.dam.ad.orm.practicas.biblioteca.repository.PrestamoRepository;
import ceu.dam.ad.orm.practicas.biblioteca.repository.SocioRepository;
import jakarta.transaction.Transactional;

@Service
public class BibliotecaServiceImpl implements BibliotecaService {

	@Autowired
	private SocioRepository repoS;
	@Autowired
	private LibroRepository repoL;
	@Autowired
	private PrestamoRepository repoP;
	@Autowired
	private CarnetRepository repoC;

	@Override
	@Transactional
	public Socio altaSocio(Socio socio) throws BibliotecaException {
		if (repoS.findById(socio.getDni()).isPresent()) {
			throw new BibliotecaException("ya existe ese socio con ese dni");
		}
		Carnet c = new Carnet();
		c.setSocio(socio);
		c.setFechaAlta(LocalDate.now());
		c.setFechaCaducidad(LocalDate.now().plusYears(1));
		socio.setCarnet(c);
		return repoS.save(socio);

	}

	@Override
	public Socio consultarSocio(String dni) throws NotFoundException {
		return repoS.findById(dni).orElseThrow(() -> new NotFoundException("No existe ese socio en la BBDD"));
	}

	@Override
	public Libro altaLibro(Libro libro) throws BibliotecaException {
		List<Libro> libros = repoL.findByIsbn(libro.getIsbn());
		if (!libros.isEmpty()) {
			throw new BibliotecaException("ya existe ese libro con ese ISBN");
		}
		return repoL.save(libro);
	}

	@Override
	public List<Libro> buscarLibros(Libro ejemplo) {
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING);
		Example<Libro> example = Example.of(ejemplo, matcher);
		return repoL.findAll(example);
		// TODO: IMPLEMENTAR POR EL ALUMNO...
	}

	@Override
	@Transactional
	public Prestamo prestarLibro(String dniSocio, Long idLibro) throws NotFoundException, BibliotecaException {
		Socio s = repoS.findById(dniSocio).orElseThrow(() -> new NotFoundException("No existe socio "));
		Libro l = repoL.findById(idLibro).orElseThrow(() -> new NotFoundException("No existe  libro"));
		;
		List<Prestamo> pActivos = s.getPrestamos().stream().filter((p) -> p.getFechaDevolucion() == null).toList();
		List<Prestamo> pActivosVencidos = s.getPrestamos().stream().filter(
				(p) -> p.getFechaPrestamo().plusDays(30).isBefore(LocalDate.now()) && p.getFechaDevolucion() == null)
				.toList();
		List<Prestamo> pl = s.getPrestamos().stream()
				.filter((p) -> p.getLibro().equals(l) && p.getFechaDevolucion() == null).toList();

		if (s.getCarnet() == null || s.getCarnet().getFechaCaducidad().isBefore(LocalDate.now()) || pActivos.size() >3
				|| l.getEjemplaresDisponibles() == 0 || pActivosVencidos.size() > 0 || pl.size() > 0) {
			throw new BibliotecaException("Error de negocio general");
		}
		Prestamo p = new Prestamo();

		Prestamo pUltimo = repoP.findFirstByAnioOrderByNumPrestamoDesc(LocalDate.now().getYear()).orElse(null);
		if (pUltimo == null) {
			p.setNumPrestamo(1);
		} else {
			p.setNumPrestamo(pUltimo.getNumPrestamo() + 1);
		}
		p.setAnio(LocalDate.now().getYear());
		p.setFechaPrestamo(LocalDate.now());
		l.setEjemplaresDisponibles(l.getEjemplaresDisponibles() - 1);
		repoL.save(l);
		return repoP.save(p);
	}

	@Override
	@Transactional
	public void devolverLibro(Integer anio, Integer numPrestamo) throws NotFoundException, BibliotecaException {
		PrestamoKey p = new PrestamoKey();
		p.setAnio(anio);
		p.setNumPrestamo(numPrestamo);
		Prestamo pConfirmate = repoP.findById(p).orElseThrow(() -> new NotFoundException("No existe ese prestamos"));
		if (pConfirmate.getFechaDevolucion() != null) {
			throw new BibliotecaException("El prestamo ya se habia devuelto");
		}
		pConfirmate.setFechaDevolucion(LocalDate.now());
		pConfirmate.getLibro().setEjemplaresDisponibles(pConfirmate.getLibro().getEjemplaresDisponibles() + 1);
		repoP.save(pConfirmate);
		repoL.save(pConfirmate.getLibro());
	}

	@Override
	public Carnet renovarCarnet(String dniSocio) throws NotFoundException, BibliotecaException {
		Socio s = repoS.findById(dniSocio).orElseThrow(() -> new NotFoundException("No existe ese socio en la BBDD"));
		if (s.getCarnet() == null) {
			throw new BibliotecaException("EL socio no tiene carnet");
		}
		if (s.getCarnet().getFechaCaducidad().isAfter(LocalDate.now())) {
			s.getCarnet().setFechaCaducidad(LocalDate.now().plusYears(1));
		} else {
			s.getCarnet().setFechaCaducidad(s.getCarnet().getFechaCaducidad().plusYears(1));
		}
		return repoC.save(s.getCarnet());
	}

	@Override
	public List<Prestamo> consultarPrestamosActivos(String dniSocio) throws NotFoundException {
		Socio s = repoS.findById(dniSocio).orElseThrow(() -> new NotFoundException("No existe ese socio en la BBDD"));
		return s.getPrestamos().stream().filter(p -> p.getFechaDevolucion() == null).toList();
	}

}

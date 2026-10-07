package ceu.dam.ad.test.peliculas.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ceu.dam.ad.test.peliculas.model.Pelicula;
import ceu.dam.ad.test.peliculas.repositories.PeliculaRepository;
@Service
public class PeliculaService {
	@Autowired
	private  PeliculaRepository repo;

	

	public List<Pelicula> consultarPelicula() {
		return repo.findAll();
	}

	public Pelicula consultarPelicula(Long id) throws PeliculaNotFoundException {
		Optional<Pelicula> pelicula = repo.findById(id);
	//	if (pelicula.isPresent()) {
	//		return pelicula.get();
			
	//	}
	//	throw new PeliculaNotFoundException("No existe la pelicula con ese id "+id);
		return pelicula.orElseThrow(()-> new PeliculaNotFoundException("No existe la pelicula con ese id "+id));
	}
	public List<Pelicula> consultarPeliculaDirectorEstreno(String director,Integer año) throws PeliculaNotFoundException {
		return repo.findByDirectorContainsAndEstrenoEquals(director,año);
	}
	public List<Pelicula> consultarPeliculaDirectorTitulo(String parametro) throws PeliculaNotFoundException {
		return repo.findByTituloContainsOrDirectorContains(parametro, parametro);
	}
	public Pelicula crearPelicula(Pelicula pelicula)  {
		return repo.save(pelicula);
	}
	public Pelicula actualizar(Pelicula pelicula)  {
		return repo.save(pelicula);
	}
	public void borrar(Pelicula pelicula)  {
		 repo.delete(pelicula);
	}
	public List<Pelicula> consultarPeliculaAños(Integer cantAños) throws PeliculaNotFoundException {
		
		return repo.findByEstrenoIsAfter(LocalDate.now().minusYears(cantAños).getYear());
	}
}

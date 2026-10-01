package ceu.dam.ad.test.peliculas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ceu.dam.ad.test.peliculas.model.Pelicula;
import ceu.dam.ad.test.peliculas.repositories.PeliculaRepository;
@Service
public class PeliculaService {
	
	private final PeliculaRepository repo;

	PeliculaService(PeliculaRepository repo) {
		this.repo = repo;
	}

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
	public Pelicula crearPelicula(Pelicula pelicula)  {
		return repo.save(pelicula);
	}
	public Pelicula actualizar(Pelicula pelicula)  {
		return repo.save(pelicula);
	}
	
	public void borrar(Long id)  {
		 repo.deleteById(id);
		 repo.
	}

}

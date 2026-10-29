package ceu.dam.ad.orm.practicas.basicas.ejercicio1.service;

import java.util.List;


import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import ceu.dam.ad.orm.practicas.basicas.ejercicio1.model.Serie;
import ceu.dam.ad.orm.practicas.basicas.ejercicio1.repositories.SerieRepository;
import jakarta.transaction.Transactional;

@Service
public class SeriesServiceImpl implements SeriesService {
	private final SerieRepository repo;

	SeriesServiceImpl(SerieRepository repo) {
		this.repo = repo;
	}

	@Override
	public Serie consultarSerie(Long idSerie) throws  SeriesServiceException, SerieNotFoundException { 
		try {
				return repo.findById(idSerie).orElseThrow(()-> new SerieNotFoundException("No existe esa serie con ese id"+idSerie));
		} catch (DataAccessException e) {
			throw new SeriesServiceException("Error buscando serie en la base de datos", e);
		}
	}
	
	
	@Override
	public List<Serie> buscarSeries(String filtroDescripcion) throws  SeriesServiceException, SerieNotFoundException {
		try {
			List<Serie> series = repo.findByDescripcionContaining(filtroDescripcion);
			if (series.isEmpty()) {
				throw new SerieNotFoundException("No existe ninguna serie con esa descripcion"+ filtroDescripcion);
			}
			return series;
		} catch (DataAccessException e) {
			throw new SeriesServiceException("Error buscando esa serie en la base de datos", e);
		}
		
	}
	
	@Override
	@Transactional //todo lo que modifique
	public Serie crearSerie(Serie serie) throws SeriesServiceException {
		try {
			return repo.save(serie);
		} catch (DataAccessException e) {
			throw new SeriesServiceException("Error creando  esa serie en la base de datos", e);
		}
		
	}
	
	
	@Override
	@Transactional
	public void elimnarSerie(Long idSerie) throws  SeriesServiceException {
		try {
			repo.deleteById(idSerie); 
		} catch (DataAccessException e) {
			throw new SeriesServiceException("Error  eliminar esa serie en la base de datos", e);
		}
		
	}
	
	
	@Override
	@Transactional
	public void actualizarSerie(Serie serie) throws SeriesServiceException {
		try {
			repo.save(serie);
		} catch (DataAccessException e) {
			throw new SeriesServiceException("Error actualizando esa serie en la base de datos", e);
		}
		
		
	}
	
	
}

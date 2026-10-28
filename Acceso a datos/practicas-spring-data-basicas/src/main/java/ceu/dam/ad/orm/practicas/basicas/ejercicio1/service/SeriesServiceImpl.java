package ceu.dam.ad.orm.practicas.basicas.ejercicio1.service;

import java.util.List;

import javax.management.ServiceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import ceu.dam.ad.orm.practicas.basicas.ejercicio1.model.Serie;
import ceu.dam.ad.orm.practicas.basicas.ejercicio1.repositories.SerieRepository;

public class SeriesServiceImpl implements SeriesService {
	@Autowired
	private SerieRepository repo;

	@Override
	public Serie consultarSerie(Long idSerie) throws  SeriesServiceException, ServiceNotFoundException {
		try {
				return repo.findById(idSerie).orElseThrow(()-> new ServiceNotFoundException("No existe esa serie con ese id"+idSerie));
		} catch (DataAccessException e) {
			throw new SeriesServiceException("Error con buscando sere en la base de datos", e);
		}
	}
	
	
	@Override
	public List<Serie> buscarSeries(String filtroDescripcion) throws SeriesServiceException  ServiceNotFoundException {
		try {
			List<Serie> series = repo.findByDescripcion(filtroDescripcion);
			if (series.isEmpty()) {
				throw new ServiceNotFoundException("No existe ninguna serie con esa descripcion"+ filtroDescripcion);
			}
			return series;
		} catch (DataAccessException e) {
			throw new SeriesServiceException("Error con buscando sere en la base de datos", e);
		}
		
	}
	
	@Override
	public Serie crearSerie(Serie serie) throws SeriesServiceException {
		return null;
		// TODO: IMPLEMENTAR POR EL ALUMNO...
		
	}
	
	
	@Override
	public void elimnarSerie(Long idSerie) throws SeriesServiceException {
		// TODO: IMPLEMENTAR POR EL ALUMNO...
		
	}
	
	
	@Override
	public void actualizarSerie(Serie serie) throws SeriesServiceException {
		// TODO: IMPLEMENTAR POR EL ALUMNO...
		
	}
	
	
}

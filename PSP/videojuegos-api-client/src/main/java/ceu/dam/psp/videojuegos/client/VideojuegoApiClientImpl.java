package ceu.dam.psp.videojuegos.client;

import java.util.List;

import ceu.dam.psp.videojuegos.exceptions.ApiException;
import ceu.dam.psp.videojuegos.exceptions.NotFoundException;
import ceu.dam.psp.videojuegos.model.Videojuego;

public class VideojuegoApiClientImpl implements VideojuegoApiClient{
	
	private String urlBase; // Este atributo contendrá la URL base a la que hacer las peticiones
	
	public VideojuegoApiClientImpl(String uuidUrl) { 
		// El constructor recibe el identificador que ha generado crudcrud.com para nuestro API y construye la URL base
		urlBase = "https://crudcrud.com/api/" + uuidUrl + "/";
	}
	
	// TODO: Implementar el resto de métodos
	@Override
	public Videojuego findById(String id) throws NotFoundException, ApiException {
		return null;
	}

	@Override
	public List<Videojuego> findByAñoPublicacion(Integer año) throws NotFoundException, ApiException {
		return null;
	}

	@Override
	public String create(Videojuego videojuego) throws ApiException {
		return null;
	}

	@Override
	public void update(Videojuego videojuego) throws NotFoundException, ApiException {
	}

	@Override
	public void delete(String id) throws NotFoundException, ApiException {
	}

}

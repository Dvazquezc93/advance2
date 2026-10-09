package ceu.dam.psp.videojuegos.client;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.channels.FileLockInterruptionException;
import java.util.Arrays;
import java.util.List;

import ceu.dam.psp.videojuegos.exceptions.ApiException;
import ceu.dam.psp.videojuegos.exceptions.NotFoundException;
import ceu.dam.psp.videojuegos.model.Videojuego;
import tools.jackson.databind.ObjectMapper;

public class VideojuegoApiClientImpl implements VideojuegoApiClient {
	private HttpClient httpClient;
	private String urlBase; // Este atributo contendrá la URL base a la que hacer las peticiones

	public VideojuegoApiClientImpl(String uuidUrl) {
		// El constructor recibe el identificador que ha generado crudcrud.com para
		// nuestro API y construye la URL base
		this.urlBase = "https://crudcrud.com/api/" + uuidUrl;
		httpClient = HttpClient.newHttpClient();
	}

	// TODO: Implementar el resto de métodos
	@Override
	public Videojuego findById(String id) throws NotFoundException, ApiException {
		HttpRequest request = HttpRequest.newBuilder(URI.create(urlBase + "/" + id)).GET().build();
		try {
			HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :" + response.statusCode());
			if (response.statusCode() == 200) {
				return new ObjectMapper().readValue(response.body(), Videojuego.class);

			}
			if (response.statusCode() == 404) {
				throw new NotFoundException("No existe ese videjuego");
			}
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			throw new ApiException("Error consultado Api videojuegos");
		}
		return null;
	}

	@Override
	public List<Videojuego> findByAñoPublicacion(Integer año) throws NotFoundException, ApiException {
		HttpRequest request = HttpRequest.newBuilder(URI.create(urlBase + "?añoPublicacion=" + año)).GET().build();
		try {
			HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :" + response.statusCode());
			if (response.statusCode() == 200) {
				return Arrays.asList(new ObjectMapper().readValue(response.body(), Videojuego.class));

			}

			throw new NotFoundException("No existe ese videjuego");

		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			throw new ApiException("Error consultado Api videojuegos");
		}

	}

	@Override
	public String create(Videojuego videojuego) throws ApiException {
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(videojuego);
		HttpRequest request = HttpRequest.newBuilder(URI.create(urlBase)).POST(BodyPublishers.ofString(json)).build();
		try {
			HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
			System.out.println("codigo respuesta: " + response.statusCode());
			if (response.statusCode() == 200) {
				Videojuego v = mapper.readValue(response.body(), Videojuego.class);
				return v.getId();
			}
			throw new ApiException("Error consultado Api videojuegos");

		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			throw new ApiException("Error consultado Api videojuegos");
		}

	}

	@Override
	public void update(Videojuego videojuego) throws NotFoundException, ApiException {
		HttpRequest request = HttpRequest.newBuilder(URI.create(urlBase + "/" + videojuego.getId())).GET().build();
		try {
			HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :" + response.statusCode());
			if (response.statusCode() == 404) {
				ObjectMapper mapper = new ObjectMapper();
				String json = mapper.writeValueAsString(videojuego);
				HttpRequest request2 = HttpRequest.newBuilder(URI.create(urlBase)).PUT(BodyPublishers.ofString(json)).build();
				
			}
			throw new NotFoundException("No existe ese videjuego");

		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			throw new ApiException("Error consultado Api videojuegos");
		}
	}

	@Override
	public void delete(String id) throws NotFoundException, ApiException {
	}

}

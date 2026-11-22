package ceu.dam.psp.wallapop.client;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import ceu.dam.psp.wallapop.exceptions.ApiConexionException;
import ceu.dam.psp.wallapop.exceptions.NoAutorizadoException;
import ceu.dam.psp.wallapop.exceptions.NoExisteException;
import ceu.dam.psp.wallapop.model.Articulo;
import ceu.dam.psp.wallapop.model.Usuario;
import tools.jackson.databind.ObjectMapper;

public class WallapopApiClientImpl implements WallapopApiClient {
	private String url;
	private HttpClient httpClient;
	private String apiKey;

	public WallapopApiClientImpl() {
		this.apiKey = "blas"; 
		this.url = "http://localhost:8080/Wallapop";
		this.httpClient = HttpClient.newHttpClient();
	}

	@Override
	public Usuario login(String identificador, String password) throws NoAutorizadoException, ApiConexionException {
		Usuario us = new Usuario();
		us.setIdentificador(identificador);
		us.setContraseña(password);
		String json = new ObjectMapper().writeValueAsString(us);
		HttpRequest request = HttpRequest.newBuilder(URI.create(url+"/login")).header("API-Key",apiKey).POST(BodyPublishers.ofString(json)).build();
		try {
			HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :"+response.statusCode());
			if (response.statusCode()==200) {
				 return new ObjectMapper().readValue(response.body(), Usuario.class);
			}
			else if (response.statusCode()==400) {
				throw new NoAutorizadoException("El usuario o contraseña son incorrectos");
			}
			
			
		} catch (IOException |InterruptedException e) {
			e.printStackTrace();
			throw new ApiConexionException("Error creando en  Api Wallapop",e);
		}
		return null;
	}

	@Override
	public Articulo consultarArticulo(Long codigoArticulo) throws NoExisteException, ApiConexionException {
		HttpRequest request = HttpRequest.newBuilder(URI.create(url+"/articulos")).header("API-Key",apiKey).GET().build();
		try {
			HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :"+response.statusCode());
			if (response.statusCode()==200) {
				 return new ObjectMapper().readValue(response.body(), Articulo.class);
			}
			else if (response.statusCode()==400) {
				throw new NoExisteException("El articulo no existe ");
			}
			
			
		} catch (IOException |InterruptedException e) {
			e.printStackTrace();
			throw new ApiConexionException("Error consultando en  Api Wallapop",e);
		}
		return null;
	}

}

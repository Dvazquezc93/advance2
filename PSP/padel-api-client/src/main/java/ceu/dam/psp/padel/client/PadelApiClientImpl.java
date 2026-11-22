package ceu.dam.psp.padel.client;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublisher;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;

import ceu.dam.psp.padel.dto.JugadorResponseDto;
import ceu.dam.psp.padel.exceptions.ApiConexionException;
import ceu.dam.psp.padel.exceptions.PadelInvalidDataException;
import ceu.dam.psp.padel.exceptions.PadelNotFoundException;
import tools.jackson.databind.ObjectMapper;


public class PadelApiClientImpl  implements PadelApiClient{
	private String url;
    private String apiKey;
    private HttpClient httpClient;

    public PadelApiClientImpl(String apiKey) {
        this.apiKey = apiKey; // Este apiKey está sin cifrar
        this.url ="http://localhost:8080/api";
        this.httpClient = HttpClient.newHttpClient();
    }

	@Override
	public List<JugadorResponseDto> buscarJugadores(String nivel, int edadMin, int edadMax)
			throws ApiConexionException, PadelNotFoundException {
		HttpRequest request = HttpRequest.newBuilder(URI.create(url+"/jugadores/buscar?nivel={nivel}&&edadMin={edadMin}&&edadMax={edadMax}")).header("API-KEY",DigestUtils.sha512Hex(apiKey)).GET().build();
		try {
			HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :"+response.statusCode());
			if (response.statusCode()==200) {
				List<JugadorResponseDto> j= Arrays.asList(new ObjectMapper().readValue(response.body(), JugadorResponseDto[].class));
				if (j.isEmpty()) {
					throw new PadelNotFoundException("No se ha encontrado ningun jugador");
				}
				return j;
			}
			
		} catch (IOException |InterruptedException e) {
			e.printStackTrace();
			throw new ApiConexionException("Error consultando Api padel",e);
		}
		return null;
	}

	@Override
	public String crearPartidoDobles(Long idOrganizador, Integer hora)
			throws ApiConexionException, PadelNotFoundException, PadelInvalidDataException {
			
		HttpRequest request = HttpRequest.newBuilder(URI.create(url+"/jugadores/{idOrganizador}/partidos?hora={hora}&&individuales=False")).header("API-KEY",DigestUtils.sha512Hex(apiKey)).POST(null).build();
		try {
			HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :"+response.statusCode());
			if (response.statusCode()==200) {
				 return new ObjectMapper().readValue(response.body(), String.class);
			}
			else if (response.statusCode()==400) {
				throw new PadelInvalidDataException("Los datos no son correctos");
			}
			else if (response.statusCode()==404) {
				throw new PadelNotFoundException("Ese jugador no existe");
			}
			
		} catch (IOException |InterruptedException e) {
			e.printStackTrace();
			throw new ApiConexionException("Error creando en  Api padel",e);
		}
		return null;
	
	}

	@Override
	public List<JugadorResponseDto> addJugador(String codigoPartido, Long idJugador)
			throws ApiConexionException, PadelNotFoundException, PadelInvalidDataException {
		HttpRequest request = HttpRequest.newBuilder(URI.create(url+"/api/partidos/{codigoPartido/jugadores/{idJugador}")).header("API-KEY",DigestUtils.sha512Hex(apiKey)).PUT(null).build();
		try {
			HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
			System.out.println("Codigo respuesta :"+response.statusCode());
			if (response.statusCode()==200) {
				 return Arrays.asList(new ObjectMapper().readValue(response.body(),JugadorResponseDto[].class ));
			}
			else if (response.statusCode()==400) {
				throw new PadelInvalidDataException("El partido ya esta lleno o el jugador ya esta inscrito");
			}
			else if (response.statusCode()==404) {
				throw new PadelNotFoundException("El partido o el jugador no existe");
			}
			
		} catch (IOException |InterruptedException e) {
			e.printStackTrace();
			throw new ApiConexionException("Error creando en  Api padel",e);
		}
		return null;
	
	}


}

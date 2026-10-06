package client;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.Arrays;
import java.util.List;

import tools.jackson.databind.ObjectMapper;

public class ApiClient {
 private HttpClient httpClient;
 private String urlBase;
 
 public ApiClient(String urlBase) {
	 this.urlBase = urlBase;
	 httpClient =HttpClient.newHttpClient();
 }
 
 public Coche getCocheByID(String id) throws CochesApiException, CochesNotFoundException  {
	 HttpRequest request =HttpRequest.newBuilder(URI.create(urlBase+"/"+id)).GET().build();
	 try {
		HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
		System.out.println("Codigo respuesta :"+response.statusCode());
		if (response.statusCode()==200) {
			return new ObjectMapper().readValue(response.body(), Coche.class);
		
			
		}
		 if(response.statusCode()==404) {
			throw new CochesNotFoundException("No existe ese coche");
		}
		throw new CochesApiException("Codigo respuesta erroneo");
	} catch (IOException |InterruptedException e) {
		e.printStackTrace();
		throw new CochesApiException("Error consultando Api coches",e);
	}
 }
 public List<Coche> getCochesAll() throws CochesApiException {
	 HttpRequest request =HttpRequest.newBuilder(URI.create(urlBase)).GET().build();
	 try {
		HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
		System.out.println("Codigo respuesta :"+response.statusCode());
		if (response.statusCode()==200) {
			return Arrays.asList(new ObjectMapper().readValue(response.body(), Coche[].class));
		
			
		}
		 
		throw new CochesApiException("Codigo respuesta erroneo");
	} catch (IOException |InterruptedException e) {
		e.printStackTrace();
		throw new CochesApiException("Error consultando Api coches",e);
	}
 }
 public Coche crearCoche(Coche coche) throws CochesApiException {
	 ObjectMapper mapper =new ObjectMapper();
	 String json = mapper.writeValueAsString(coche);
	 HttpRequest request =HttpRequest.newBuilder(URI.create(urlBase)).POST(BodyPublishers.ofString(json)).build();
	 try {
		
		HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());
		System.out.println("Codigo respuesta :"+response.statusCode());
		if (response.statusCode()==200) {
			return mapper.readValue(response.body(), Coche.class);
		
			
		}
		 
		throw new CochesApiException("Codigo respuesta erroneo");
	} catch (IOException |InterruptedException e) {
		e.printStackTrace();
		throw new CochesApiException("Error consultando Api coches",e);
	}
 }
 
}

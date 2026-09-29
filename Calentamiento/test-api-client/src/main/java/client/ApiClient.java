package client;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class ApiClient {
 private HttpClient httpClient;
 private String urlBase;
 
 public ApiClient(String urlBase) {
	 this.urlBase = urlBase;
	 httpClient =HttpClient.newHttpClient();
 }
 
 public String getCocheByID(String id) throws CochesApiException, CochesnotFoundException {
	 HttpRequest request =HttpRequest.newBuilder(URI.create(urlBase+"/"+id)).GET().build();
	 try {
		HttpResponse<String> response =httpClient.send(request, BodyHandlers.ofString());
		System.out.println("Codigo respuesta :"+response.statusCode());
		if (response.statusCode()==200) {
			return response.body();
			
		}
		 if(response.statusCode()==404) {
			throw new CochesnotFoundException("No existe ese coche");
		}
		throw new CochesApiException("Codigo respuesta erroneo");
	} catch (IOException |InterruptedException e) {
		e.printStackTrace();
		throw new CochesApiException("Error consultando Api coches",e);
	}
 }
}

package client;

import java.util.List;

public class Test {
	public static void main(String[] args) throws CochesApiException, CochesNotFoundException {
		ApiClient apiClient = new ApiClient("https://ca0134dac4caf273ad0b.free.beeceptor.com/api/coches");
		try {
			System.out.println(">>>>>>> Test de un coche:");
			System.out.println(apiClient.getCocheByID("a4422b9235dbae20bb57"));
			System.out.println(">>>>>>> Test de todos los coches:");
			List<Coche> coches = apiClient.getCochesAll();
			coches.forEach(System.out::println);
			System.out.println(">>>>>>> Test crear coche:");
			Coche nuevo = new Coche();
			nuevo.setMatricula("0000LLL");
			nuevo.setModelo("Audi");
			nuevo.setMarca("A3");
			nuevo.setColor("Azul");
			System.out.println(apiClient.crearCoche(nuevo));
		} catch (CochesApiException e) {
			e.printStackTrace();
		} catch (CochesNotFoundException e) {
			e.printStackTrace();
		}
	}
}

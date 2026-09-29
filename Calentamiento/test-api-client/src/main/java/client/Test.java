package client;

public class Test {
	public static void main(String[] args) throws CochesApiException, CochesnotFoundException {
	ApiClient apiClient = new ApiClient("https://crudcrud.com/api/49a4754b72a64d26b4b00e57f7cf2377/coche");
	String coche =apiClient.getCocheByID("6abbf86c0ef6b103e89522a7");
	
		System.out.println(coche );
	}
}

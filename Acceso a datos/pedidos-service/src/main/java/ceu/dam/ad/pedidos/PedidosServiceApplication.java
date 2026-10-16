package ceu.dam.ad.pedidos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import ceu.dam.ad.pedidos.test.TestPedido;

@SpringBootApplication
public class PedidosServiceApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(PedidosServiceApplication.class, args);
		TestPedido test = context.getBean(TestPedido.class);
		test.testCrear();
		test.testConsultar(3L);
		
	}
	
	

}
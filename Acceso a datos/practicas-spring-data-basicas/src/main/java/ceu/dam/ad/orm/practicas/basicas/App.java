package ceu.dam.ad.orm.practicas.basicas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import ceu.dam.ad.orm.practicas.basicas.ejercicio1.test.Test1;
import ceu.dam.ad.orm.practicas.basicas.ejercicio2.test.Test2;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		ConfigurableApplicationContext context =SpringApplication.run(App.class, args);
		//context.getBean(Test1.class).test();
		context.getBean(Test2.class).test();
		
		
	}

}

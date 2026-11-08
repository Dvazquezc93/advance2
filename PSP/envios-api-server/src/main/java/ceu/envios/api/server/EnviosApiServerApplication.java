package ceu.envios.api.server;

import java.util.List;

import javax.swing.text.Document;
import java.util.List;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan("ceu")
@EntityScan("ceu")
@SpringBootApplication
public class EnviosApiServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EnviosApiServerApplication.class, args);
	}
	
}

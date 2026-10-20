package ceu.user.api.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan("ceu")
@EntityScan("ceu")
@SpringBootApplication
public class UserApiServer1Application {

	public static void main(String[] args) {
		SpringApplication.run(UserApiServer1Application.class, args);
	}

}

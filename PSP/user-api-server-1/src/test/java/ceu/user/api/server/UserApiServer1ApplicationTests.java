package ceu.user.api.server;

import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan("ceu")
@EntityScan("ceu")
class UserApiServer1ApplicationTests {

	@Test
	void contextLoads() {
	}

}

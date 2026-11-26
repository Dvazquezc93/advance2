package ceu.student.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import ceu.student.api.test.Test;

@SpringBootApplication
public class StudentsApiServerApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context =SpringApplication.run(StudentsApiServerApplication.class, args);
		
		context.getBean(Test.class).test();
	}

}

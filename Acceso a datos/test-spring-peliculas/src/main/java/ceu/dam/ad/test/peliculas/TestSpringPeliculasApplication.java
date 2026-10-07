package ceu.dam.ad.test.peliculas;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import ceu.dam.ad.test.peliculas.model.Pelicula;
import ceu.dam.ad.test.peliculas.services.PeliculaNotFoundException;
import ceu.dam.ad.test.peliculas.services.PeliculaService;

@SpringBootApplication
public class TestSpringPeliculasApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(TestSpringPeliculasApplication.class, args);
		PeliculaService service = context.getBean(PeliculaService.class);
		//List<Pelicula> result = service.consultarPelicula();
		//result.forEach(System.out::println);
		try {
			//System.out.println("DIRECTOR ESPECIFICO");
			//List<Pelicula> result2 = service.consultarPeliculaDirectorEstreno("PETER JACKSON",2001);
			//result2.forEach(System.out::println);
			//System.out.println("DIRECTOR ESPECIFICO POR UN LIKE");
			//List<Pelicula> result3 = service.consultarPeliculaDirectorEstreno("NOLAN",2013);
			//result3.forEach(System.out::println);
			System.out.println("TITULO DIRECTOR");
			List<Pelicula> result4 = service.consultarPeliculaDirectorTitulo("vit");
			result4.forEach(System.out::println);
			System.out.println("Año Peliculas");
			List<Pelicula> result5 = service.consultarPeliculaAños(10);
			result5.forEach(System.out::println);
		} catch (PeliculaNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

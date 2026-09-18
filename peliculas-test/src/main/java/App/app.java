package App;

import java.sql.SQLException;
import java.util.Iterator;

import model.Pelicula;
import service.PeliculaService;

public class app {

	public static void main(String[] args) throws SQLException {
		PeliculaService ps = new PeliculaService();
		for (Pelicula peli : ps.findAll()) {
			System.out.println(peli);
		}

	}

}

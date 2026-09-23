package App;

import java.sql.SQLException;
import java.util.Iterator;

import org.apache.commons.codec.digest.DigestUtils;

import model.Pelicula;
import service.PeliculaService;

public class app {

	public static void main(String[] args) throws SQLException {
		PeliculaService ps = new PeliculaService();
		ps.findAll().forEach(System.out::println);
		try {
			String entrada ="blas";
			String cifrado = DigestUtils.sha512_256Hex(entrada);
			System.out.println(cifrado);
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

}

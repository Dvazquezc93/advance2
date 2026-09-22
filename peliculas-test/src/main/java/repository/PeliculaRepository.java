package repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import model.Pelicula;

public class PeliculaRepository {
	public List<Pelicula>findAll() throws SQLException{
		List<Pelicula> listap = new ArrayList<>();
		try(Connection conn = DatabaseConnector.getConnection()){
			String sql ="Select * from peliculas";
			PreparedStatement stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				Pelicula p =new Pelicula();
				p.setId(rs.getLong("id"));
				p.setTitulo(rs.getString("título"));
				p.setAñoEstreno(rs.getInt("año_estreno"));
				p.setDuracion(rs.getInt("duración"));
				p.setDireccion(rs.getString("dirección"));
				listap.add(p);
			};
			return listap;
		}
	}
}

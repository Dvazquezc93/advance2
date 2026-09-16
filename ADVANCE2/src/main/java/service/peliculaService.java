package service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.List;

import model.Pelicula;

public class peliculaService {
	public List<Pelicula>findAll(){
		try(Connection conn = DatabaseConnector.getConnection()){
			String sql ="Select * from peliculas";
			Prepared Statement stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				Pelicula p =new Pelicula();
				p.setId(rs.getLong("id"));
				p.setId(null);
			};
		}
	}
}

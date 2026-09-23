package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import model.Pelicula;
import repository.DatabaseConnector;
import repository.PeliculaRepository;

public class PeliculaService {
	private PeliculaRepository repo;

	public PeliculaService() {
		repo = new PeliculaRepository();
	}

	public List<Pelicula> findAll() throws SQLException {
		List<Pelicula> listMovies = repo.findAll();
		listMovies.forEach(p -> p.setEdad(LocalDate.now().getYear() - p.getAñoEstreno()));
		return listMovies;
	}

	public List<String> findAllTitleByYear(Integer year) throws SQLException {
		List<Pelicula> listMovies = repo.findAll();
		return listMovies.stream()
				.filter(Pelicula -> Pelicula.getAñoEstreno().equals(year))
				.map(Pelicula -> Pelicula.getTitulo())
				.toList();
	}
}

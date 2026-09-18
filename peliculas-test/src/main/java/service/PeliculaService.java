package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Pelicula;
import repository.DatabaseConnector;
import repository.PeliculaRepository;

public class PeliculaService {
	private  PeliculaRepository repo;
	public PeliculaService() {
		repo =new PeliculaRepository();
	}
	public List<Pelicula> findAll() throws SQLException {
		return repo.findAll();
	}
}

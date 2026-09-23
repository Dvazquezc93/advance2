package ceu.dam.ad.users.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import ceu.dam.ad.users.model.User;

public class UserRepository {
	
	/** Debe insertar un usuario en BBDD. Devuelve el ID generado. */
	public Long insert(Connection conn, User user) throws SQLException{
		
		String sql = "insert into user value(NULL,?,?,?,NULL,?)";
		PreparedStatement stmt = conn.prepareStatement(sql);
		stmt.setString(1, user.getPassword());
		stmt.setString(2, user.getUsername());
		stmt.setString(3, user.getEmail() );
		stmt.setDate(4, Date.valueOf(user.getCreatedDate()));
		stmt.execute();
		User user1 =getByEmail(conn,user.getEmail());
		return user1.getId();
		
	}
	
	/** Debe consultar un usuario por su email y devolverlo. Si no existe, devolverá null */
	public User getByEmail(Connection conn, String email) throws SQLException {
		String sql = "select * from user where email = ?";
		PreparedStatement stmt = conn.prepareStatement(sql);
		stmt.setString(1, email);
		return null;
	}

	
	/** Debe consultar un usuario por su ID y devolverlo. Si no existe, devolverá null.  NOTA: no dupliques código */
	public User getById(Connection conn, Long id) throws SQLException{
		return null;
	}


	/** Debe consultar un usuario por su email y devolverlo. Si no existe, devolverá null. NOTA: no dupliques código  */
	public User getByUserName(Connection conn, String userName) throws SQLException{
		return null;
	}

	/** Debe actualizar todos los datos de un usuario y devolver el número de registros actualizados. */
	public Integer update(Connection conn, User user) throws SQLException{
		return null;
	}
	
}

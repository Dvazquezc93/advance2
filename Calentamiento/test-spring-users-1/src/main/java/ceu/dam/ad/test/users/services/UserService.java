package ceu.dam.ad.test.users.services;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;

import ceu.dam.ad.test.users.model.User;
import ceu.dam.ad.test.users.repositories.UserRepository;
import ceu.dam.ad.users.services.DuplicateUserException;
import ceu.dam.ad.users.services.UserException;
import model.Pelicula;

public class UserService {
	@Autowired
	private UserRepository repo;
	
	public User createUser(User user) throws DuplicateUserException, UserException {
		try {
			if (repo.findByUsernameAndEmail(user.getUsername(),user.getEmail()).isEmpty()) {
				user.setCreatedDate(LocalDate.now());
				String out = DigestUtils.sha3_256Hex(user.getPassword());
				user.setPassword(out);
				return repo.save(user);
			}
			else {
				throw new DuplicateUserException("El usuario ya esta en el BBDD");
			}
		} catch (Exception e) {
			throw new UserException("Error al conectar a la base de datos", e);
		}
		
	
		
	}
	public void changePassword(Long idUser, String oldPassword, String newPassword) throws UserException {
		try {
			if (repo.findById(idUser).isPresent()) {
				String out1 = DigestUtils.sha3_256Hex(oldPassword);
				String out2 = DigestUtils.sha3_256Hex(newPassword);
				if (!out1.equals(out2)) {
					repo.findById(idUser);
				}
			}
		} catch (Exception e) {
			throw new UserException("Error al conectar a la base de datos", e);		}
	}
	
	

}

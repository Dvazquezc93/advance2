import ceu.dam.ad.test.users.model.User;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;

import ceu.dam.ad.test.users.model.User;
import ceu.dam.ad.test.users.repositories.UserRepository;
import ceu.dam.ad.users.services.DuplicateUserException;
import ceu.dam.ad.users.services.UserException;
import ceu.dam.ad.users.services.UserNotFoundException;
import ceu.dam.ad.users.services.UserUnauthorizedException;
import model.Pelicula;

public class UserService {
	@Autowired
	private UserRepository repo;
	
	public User createUser(User user) throws DuplicateUserException, UserException {
		try {
			if (repo.findByUsernameAndEmail(user.getName(),user.getEmail()).isEmpty()) {
				user.setCreatedDate(LocalDate.now());
				String out = DigestUtils.sha3_256Hex(user.getPassword());
				user.setPassword(out);;
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
					User user =repo.findById(idUser).orElseThrow( () -> new  UserNotFoundException("El usuario no esta en el BBDD"));
					user.setPassword(out2);
					repo.save(user);
				}
				else {
					throw new UserUnauthorizedException("Las dos contraseñas son iguales");
				}
			}
			else {
				throw new UserUnauthorizedException("El usuario no esta en el BBDD");
			}
		} catch (Exception e) {
			throw new UserException("Error al conectar a la base de datos", e);		}
	}
	public User login(String login, String password)
			throws UserNotFoundException, UserUnauthorizedException, UserException {
		try {
			String out = DigestUtils.sha3_256Hex(password);
			User user = repo.findByUsernameOrEmail(login, login).orElseThrow(()->new UserNotFoundException("El usuario no esta en el BBDD"));
			if (user.getPassword().equals(out)) {
				try {
					user.setLastLoginDate(LocalDate.now());
					return repo.save(user);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			else {
				throw new UserUnauthorizedException("la contraseña no es correcta ");
			}
		} catch (Exception e) {
			throw new UserException("Error al conectar a la base de datos", e);	
		}
		
	}
	public User getUser(Long idUser) throws UserNotFoundException, UserException {
		try {
			return repo.findById(idUser).orElseThrow(()->new  UserNotFoundException("El usuario no esta en el BBDD"));
		} catch (Exception e) {
			throw new UserException("Error al conectar a la base de datos", e);	
		
	}
	
	
}
	
}

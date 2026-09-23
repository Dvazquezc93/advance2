package ceu.dam.ad.users.services;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDate;

import org.apache.commons.codec.digest.DigestUtils;

import ceu.dam.ad.users.dao.UserRepository;
import ceu.dam.ad.users.model.User;

public class UsersServiceImpl extends Service implements UserService {
	private UserRepository repo;

	public UsersServiceImpl() {
		repo = new UserRepository();
	}

	@Override
	public User createUser(User user) throws DuplicateUserException, UserException {
		/**
		 * Recibe un usuario que trae indicado su username, email y password (sin
		 * cifrar). El servicio tendrá que: 1. Verificar que no existe usuario con ese
		 * email ni ese username. En caso contrario, lanzar DuplicateUserException 2.
		 * Registrar el usuario en BBDD completando su fecha de alta y cifrando su
		 * password con SHA3-256 3. Devolver el usuario con todos sus datos (incluyendo
		 * el ID) 4. Si hay algún error, lanzará UserException con el origen
		 */
		try (Connection conn = abrirConexion()) {
			if (repo.getByEmail(conn, user.getEmail()) == null
					&& repo.getByUserName(conn, user.getUsername()) == null) {
				user.setCreatedDate(LocalDate.now());
				String out = DigestUtils.sha3_256Hex(user.getPassword());
				user.setPassword(out);
				repo.insert(conn, user);
				return user;
			} else {
				throw new DuplicateUserException("El usuario ya esta en el BBDD");
			}
		} catch (SQLException e) {
			throw new UserException("Error al conectar a la base de datos", e);
		}

	}

	@Override
	public void changePassword(Long idUser, String oldPassword, String newPassword)
			throws UserNotFoundException, UserUnauthorizedException, UserException {
		/**
		 * Recibe el id de un usuario, el password antiguo y el nuevo. Los dos sin
		 * cifrar. El servicio tendrá que: 1. Si el usuario no existe con ese ID, lanzar
		 * UserNotFoundException 2. Verificar que la nueva password no es igual a la
		 * antigua. Si lo es, lanzar UserUnauthorizedException 3. Verificar que la
		 * password antigua es correcta. Si no lo es, lanzar UserUnauthorizedException
		 * 4. Actualizar el nuevo password en el usuario cifrándolo previamente. 5. Si
		 * hay algún error, lanzará UserException con el origen
		 */
		try (Connection conn = abrirConexion()) {
			if (repo.getById(conn, idUser) != null) {
				String out1 = DigestUtils.sha3_256Hex(oldPassword);
				String out2 = DigestUtils.sha3_256Hex(newPassword);
				if (out1.equals(out2)) {
					User user = repo.getById(conn, idUser);
					user.setPassword(out2);
					repo.update(conn, user);
				} else {
					throw new UserUnauthorizedException("Las dos contraseñas son iguales");
				}

			} else {
				throw new UserUnauthorizedException("El usuario no esta en el BBDD");
			}
		} catch (SQLException e) {
			throw new UserException("Error al conectar a la base de datos", e);
		}
	}

	@Override
	public User login(String login, String password)
			throws UserNotFoundException, UserUnauthorizedException, UserException {
		/**
		 * Recibe un login que puede ser un username o un email, y el password sin
		 * cifrar. El servicio tendrá que: 1. Verificar que existe algún usuario con ese
		 * username o email. Si no es así, lanzar UserNotFoundException 2. Verificar que
		 * password es correcta. Si lo es, lanzar UserUnauthorizedException 3.
		 * Actualizamos fecha del último login. Si hay algún error aquí, registramos en
		 * el log, pero continuamos. 4. Devolver el usuario con todos sus datos que ha
		 * realizado el login. 5. Si hay algún error, lanzará UserException con el
		 * origen
		 */

		try (Connection conn = abrirConexion()) {
			User email = repo.getByEmail(conn, login);
			User userName = repo.getByUserName(conn, login);
			String out = DigestUtils.sha3_256Hex(password);
			if (email == null) {
				if (userName == null) {
					throw new UserNotFoundException("El usuario no esta en el BBDD");
				}
				if (userName.getPassword().equals(out)) {
					userName.setLastLoginDate(LocalDate.now());
					repo.update(conn, userName);
					return email;
				} else {
					throw new UserUnauthorizedException("la contraseña no es correcta ");
				}
			}
		} catch (SQLException e) {
			throw new UserException("Error al conectar a la base de datos", e);
		}
	}

	@Override
	public User getUser(Long idUser) throws UserNotFoundException, UserException {
		/** Recibe el id de un usuario. El servicio tendrá que:
		 * 1. Si el usuario no existe con ese ID, lanzar UserNotFoundException
		 * 2. Devolver los datos completos del usuario
		 * 3. Si hay algún error, lanzará UserException con el origen
		 */
		try (Connection conn = abrirConexion()) {
			User user = repo.getById(conn, idUser);
			if (user!=null) {
				return user;
			}
			else {
				throw new UserNotFoundException("El usuario no esta en el BBDD");
			}
		} catch (SQLException e) {
			throw new UserException("Error al conectar a la base de datos", e);
		}
	}

}

package ceu.dam.ad.users.test;

import java.util.UUID;

import ceu.dam.ad.users.model.User;
import ceu.dam.ad.users.services.DuplicateUserException;
import ceu.dam.ad.users.services.UserException;
import ceu.dam.ad.users.services.UserNotFoundException;
import ceu.dam.ad.users.services.UserService;
import ceu.dam.ad.users.services.UsersServiceImpl;
import ceu.dam.ad.users.services.UserUnauthorizedException;

public class TestMain {

	public static void main(String[] args) {
		UserService service = new UsersServiceImpl();

		// Generador de datos únicos para poder re-ejecutar sin limpiar la BBDD
		String randomSuffix = UUID.randomUUID().toString().substring(0, 6);
		String username = "user_" + randomSuffix;
		String email = "email_" + randomSuffix + "@test.com";
		String password = "Password123";
		String newPassword = "NewPassword456";

		User createdUser = null;

		System.out.println("========== INICIO DE PRUEBAS DEL SERVICIO ==========\n");

		// ---------------------------------------------------------------------
		// 1. TEST: createUser
		// ---------------------------------------------------------------------
		System.out.println("--- 1. Pruebas de createUser ---");
		
		// 1.1 Registro correcto
		try {
			User u = new User();
			u.setUsername(username);
			u.setEmail(email);
			u.setPassword(password);
			u.setName("Test User");

			createdUser = service.createUser(u);
			System.out.println("[OK] Usuario registrado con éxito -> ID: " + createdUser.getId() 
					+ ", Hash: " + createdUser.getPassword() 
					+ ", CreatedDate: " + createdUser.getCreatedDate());
		} catch (Exception e) {
			System.err.println("[FAIL] Error registrando usuario: " + e.getMessage());
		}

		// 1.2 Error por username duplicado
		try {
			User dupUser = new User();
			dupUser.setUsername(username); // Repetido
			dupUser.setEmail("otro_" + randomSuffix + "@test.com");
			dupUser.setPassword("otraPass");
			service.createUser(dupUser);
			System.err.println("[FAIL] Se esperaba DuplicateUserException por username repetido");
		} catch (DuplicateUserException e) {
			System.out.println("[OK] Capturada excepción esperada (Username duplicado): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		// 1.3 Error por email duplicado
		try {
			User dupEmail = new User();
			dupEmail.setUsername("otroUser_" + randomSuffix);
			dupEmail.setEmail(email); // Repetido
			dupEmail.setPassword("otraPass");
			service.createUser(dupEmail);
			System.err.println("[FAIL] Se esperaba DuplicateUserException por email repetido");
		} catch (DuplicateUserException e) {
			System.out.println("[OK] Capturada excepción esperada (Email duplicado): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		if (createdUser == null) {
			System.err.println("\nAbortando resto de pruebas: createUser falló.");
			return;
		}

		// ---------------------------------------------------------------------
		// 2. TEST: getUser
		// ---------------------------------------------------------------------
		System.out.println("\n--- 2. Pruebas de getUser ---");
		
		// 2.1 Obtener usuario existente por ID
		try {
			User found = service.getUser(createdUser.getId());
			System.out.println("[OK] Usuario recuperado correctamente -> Username: " + found.getUsername());
		} catch (Exception e) {
			System.err.println("[FAIL] Error recuperando usuario existente: " + e.getMessage());
		}

		// 2.2 Usuario inexistente
		try {
			service.getUser(-99999L);
			System.err.println("[FAIL] Se esperaba UserNotFoundException para ID inexistente");
		} catch (UserNotFoundException e) {
			System.out.println("[OK] Capturada excepción esperada (UserNotFoundException): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		// ---------------------------------------------------------------------
		// 3. TEST: login
		// ---------------------------------------------------------------------
		System.out.println("\n--- 3. Pruebas de login ---");

		// 3.1 Login con username correcto
		try {
			User logged = service.login(username, password);
			System.out.println("[OK] Login con Username exitoso -> LastLoginDate: " + logged.getLastLoginDate());
		} catch (Exception e) {
			System.err.println("[FAIL] Login con Username falló: " + e.getMessage());
		}

		// 3.2 Login con email correcto
		try {
			User logged = service.login(email, password);
			System.out.println("[OK] Login con Email exitoso -> LastLoginDate: " + logged.getLastLoginDate());
		} catch (Exception e) {
			System.err.println("[FAIL] Login con Email falló: " + e.getMessage());
		}

		// 3.3 Login con contraseña incorrecta
		try {
			service.login(username, "PasswordIncorrecta");
			System.err.println("[FAIL] Se esperaba UserUnauthorizedException por contraseña incorrecta");
		} catch (UserUnauthorizedException e) {
			System.out.println("[OK] Capturada excepción esperada (Password incorrecta): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		// 3.4 Login con usuario no existente
		try {
			service.login("usuarioInexistente_" + randomSuffix, password);
			System.err.println("[FAIL] Se esperaba UserNotFoundException");
		} catch (UserNotFoundException e) {
			System.out.println("[OK] Capturada excepción esperada (Usuario inexistente): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		// ---------------------------------------------------------------------
		// 4. TEST: changePassword
		// ---------------------------------------------------------------------
		System.out.println("\n--- 4. Pruebas de changePassword ---");

		// 4.1 Error: nueva contraseña igual a la antigua
		try {
			service.changePassword(createdUser.getId(), password, password);
			System.err.println("[FAIL] Se esperaba UserUnauthorizedException (passwords idénticas)");
		} catch (UserUnauthorizedException e) {
			System.out.println("[OK] Capturada excepción esperada (Misma contraseña): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		// 4.2 Error: contraseña antigua no coincide
		try {
			service.changePassword(createdUser.getId(), "PasswordViejaErronea", newPassword);
			System.err.println("[FAIL] Se esperaba UserUnauthorizedException (old password incorrecta)");
		} catch (UserUnauthorizedException e) {
			System.out.println("[OK] Capturada excepción esperada (Old password incorrecta): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		// 4.3 Error: usuario con ID inexistente
		try {
			service.changePassword(-99999L, password, newPassword);
			System.err.println("[FAIL] Se esperaba UserNotFoundException");
		} catch (UserNotFoundException e) {
			System.out.println("[OK] Capturada excepción esperada (Usuario no existe): " + e.getMessage());
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción incorrecta: " + e.getClass().getSimpleName());
		}

		// 4.4 Cambio correcto de contraseña
		try {
			service.changePassword(createdUser.getId(), password, newPassword);
			System.out.println("[OK] Contraseña cambiada correctamente");
		} catch (Exception e) {
			System.err.println("[FAIL] Error al cambiar la contraseña: " + e.getMessage());
		}

		// 4.5 Verificar que la contraseña antigua ya no sirve y la nueva sí
		try {
			service.login(username, password);
			System.err.println("[FAIL] El login con la contraseña antigua debería fallar");
		} catch (UserUnauthorizedException e) {
			System.out.println("[OK] La contraseña antigua ya no es válida tras el cambio");
		} catch (Exception e) {
			System.err.println("[FAIL] Excepción inesperada: " + e.getMessage());
		}

		try {
			service.login(username, newPassword);
			System.out.println("[OK] Login validado con la NUEVA contraseña con éxito");
		} catch (Exception e) {
			System.err.println("[FAIL] El login con la nueva contraseña falló: " + e.getMessage());
		}

		System.out.println("\n========== FIN DE PRUEBAS ==========");
	}
}
package ceu.dam.ad.users.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ceu.dam.ad.test.users.model.User;
import ceu.dam.ad.test.users.services.UserService;

@SpringBootApplication
public class TestMainApp implements CommandLineRunner {

    @Autowired
    private UserService service;

    public static void main(String[] args) {
        SpringApplication.run(TestMainApp.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println("========== INICIO DE PRUEBAS DEL SERVICIO ==========\n");

        Long idCreado = null;

        // 1. TEST: createUser (Éxito)
        try {
            System.out.println("--- 1. Probando createUser (caso correcto) ---");
            User nuevo = new User();
            nuevo.setName("pepe_perez");
            nuevo.setEmail("pepe@gmail.com");
            nuevo.setPassword("clave1234");

            User guardado = service.createUser(nuevo);
            idCreado = guardado.getId();
            System.out.println("OK -> Usuario creado con ID: " + idCreado);
            System.out.println("Hash de contraseña almacenada: " + guardado.getPassword());
            System.out.println("Fecha de creación: " + guardado.getCreatedDate());
        } catch (Exception e) {
            System.err.println("ERROR al crear usuario: " + e.getMessage());
            if (e.getCause() != null) System.err.println("Causa: " + e.getCause().getMessage());
        }

        // 2. TEST: createUser (Duplicado)
        try {
            System.out.println("\n--- 2. Probando createUser (usuario duplicado) ---");
            User repetido = new User();
            repetido.setName("pepe_perez");
            repetido.setEmail("pepe@gmail.com");
            repetido.setPassword("otraClave");

            service.createUser(repetido);
            System.err.println("FALLO -> Debería haber fallado por duplicado");
        } catch (Exception e) {
            System.out.println("OK -> Capturada excepción esperada: " + e.getMessage());
            if (e.getCause() != null) System.out.println("Causa: " + e.getCause().getMessage());
        }

        // 3. TEST: getUser
        try {
            System.out.println("\n--- 3. Probando getUser ---");
            if (idCreado != null) {
                User consultado = service.getUser(idCreado);
                System.out.println("OK -> Usuario recuperado: " + consultado.getName() + " (" + consultado.getEmail() + ")");
            }

            // Probar ID inexistente
            System.out.println("Probando ID inexistente (99999)...");
            service.getUser(99999L);
            System.err.println("FALLO -> Debería fallar al no existir");
        } catch (Exception e) {
            System.out.println("OK -> Capturada excepción al buscar ID inexistente: " + e.getMessage());
            if (e.getCause() != null) System.out.println("Causa: " + e.getCause().getMessage());
        }

        // 4. TEST: login (Correcto e Incorrecto)
        try {
            System.out.println("\n--- 4. Probando login ---");
            
            // Login correcto por username
            User logueado = service.login("pepe_perez", "clave1234");
            System.out.println("OK -> Login correcto por username. Último acceso: " + logueado.getLastLoginDate());

            // Login correcto por email
            service.login("pepe@gmail.com", "clave1234");
            System.out.println("OK -> Login correcto por email.");

            // Login fallido: contraseña incorrecta
            System.out.println("Probando login con contraseña errónea...");
            try {
                service.login("pepe_perez", "claveMala");
                System.err.println("FALLO -> Debería denegar el acceso");
            } catch (Exception e) {
                System.out.println("OK -> Denegó el login correctamente: " + e.getMessage());
                if (e.getCause() != null) System.out.println("Causa: " + e.getCause().getMessage());
            }

        } catch (Exception e) {
            System.err.println("ERROR inesperado en login: " + e.getMessage());
        }

        // 5. TEST: changePassword
        try {
            System.out.println("\n--- 5. Probando changePassword ---");
            if (idCreado != null) {
                // Caso erróneo: misma contraseña
                System.out.println("Probando cambio con contraseñas idénticas...");
                try {
                    service.changePassword(idCreado, "clave1234", "clave1234");
                    System.err.println("FALLO -> Debería rechazar contraseñas idénticas");
                } catch (Exception e) {
                    System.out.println("OK -> Rechazó contraseñas idénticas: " + e.getMessage());
                    if (e.getCause() != null) System.out.println("Causa: " + e.getCause().getMessage());
                }

                // Caso correcto: cambio de clave
                System.out.println("Cambiando 'clave1234' por 'nuevaClave5678'...");
                service.changePassword(idCreado, "clave1234", "nuevaClave5678");
                System.out.println("OK -> Contraseña cambiada.");

                // Validamos que el login funcione con la nueva y falle con la vieja
                service.login("pepe_perez", "nuevaClave5678");
                System.out.println("OK -> Login verificado con la nueva clave.");
            }
        } catch (Exception e) {
            System.err.println("ERROR en changePassword: " + e.getMessage());
            if (e.getCause() != null) System.err.println("Causa: " + e.getCause().getMessage());
        }

        System.out.println("\n========== PRUEBAS FINALIZADAS ==========");
    }
}
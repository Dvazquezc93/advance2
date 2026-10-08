package ceu.dam.ad.test.users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import ceu.dam.ad.test.users.model.User;
import ceu.dam.ad.test.users.services.UserService;

@SpringBootApplication
public class AppTestMain {

    public static void main(String[] args) {
        // Arrancamos el contexto de Spring para obtener el bean de UserService
        ConfigurableApplicationContext context = SpringApplication.run(AppTestMain.class, args);
        UserService service = context.getBean(UserService.class);

        System.out.println("\n=======================================================");
        System.out.println("            INICIO DE PRUEBAS DE USER SERVICE          ");
        System.out.println("=======================================================\n");

        Long idGenerado = null;

        // -------------------------------------------------------------
        // 1. TEST: createUser (Éxito)
        // -------------------------------------------------------------
        try {
            System.out.println("1. [createUser] - Creando usuario nuevo...");
            User nuevo = new User();
            nuevo.setUsername("jdoe");
            nuevo.setName("John Doe");
            nuevo.setEmail("jdoe@example.com");
            nuevo.setPassword("pass1234");

            User creado = service.createUser(nuevo);
            idGenerado = creado.getId();

            System.out.println("   -> OK: Creado con ID: " + idGenerado);
            System.out.println("   -> Password hasheada: " + creado.getPassword());
            System.out.println("   -> Fecha creacion: " + creado.getCreatedDate());
        } catch (Exception e) {
            System.err.println("   -> ERROR en creacion: " + e.getMessage());
            if (e.getCause() != null) System.err.println("      Causa: " + e.getCause().getMessage());
        }

        // -------------------------------------------------------------
        // 2. TEST: createUser (Duplicado)
        // -------------------------------------------------------------
        try {
            System.out.println("\n2. [createUser] - Probando control de duplicados...");
            User duplicado = new User();
            // Nota: UserService usa user.getName() en el findByUsernameOrEmail
            duplicado.setUsername("jdoe");
            duplicado.setName("John Doe");
            duplicado.setEmail("jdoe@example.com");
            duplicado.setPassword("otraPassword");

            service.createUser(duplicado);
            System.err.println("   -> ERROR: Debería haber saltado excepción de duplicado.");
        } catch (Exception e) {
            System.out.println("   -> OK: Capturada excepción esperada: " + e.getMessage());
            if (e.getCause() != null) System.out.println("      Causa interna: " + e.getCause().getMessage());
        }

        // -------------------------------------------------------------
        // 3. TEST: getUser
        // -------------------------------------------------------------
        try {
            System.out.println("\n3. [getUser] - Consultando usuario existente...");
            if (idGenerado != null) {
                User usuario = service.getUser(idGenerado);
                System.out.println("   -> OK: Encontrado -> " + usuario.getUsername() + " (" + usuario.getEmail() + ")");
            }

            System.out.println("   [getUser] - Consultando ID inexistente (99999)...");
            service.getUser(99999L);
            System.err.println("   -> ERROR: Debería haber lanzado excepción por no existir.");
        } catch (Exception e) {
            System.out.println("   -> OK: Capturada excepción al buscar ID inexistente: " + e.getMessage());
            if (e.getCause() != null) System.out.println("      Causa interna: " + e.getCause().getMessage());
        }

        // -------------------------------------------------------------
        // 4. TEST: login (Correcto y Fallido)
        // -------------------------------------------------------------
        try {
            System.out.println("\n4. [login] - Probando inicio de sesión...");

            // Login correcto
            // En tu código: repo.findByUsernameOrEmail(login, login)
            // Si en BD el campo de búsqueda coincide, se logueará
            User logueado = service.login("jdoe@example.com", "pass1234");
            System.out.println("   -> OK: Login correcto con email. Ultimo login: " + logueado.getLastLoginDate());

            // Login con contraseña errónea
            System.out.println("   [login] - Probando con contraseña errónea...");
            try {
                service.login("jdoe@example.com", "claveIncorrecta");
                System.err.println("   -> ERROR: Debería haber denegado el acceso.");
            } catch (Exception e) {
                System.out.println("   -> OK: Rechazado correctamente: " + e.getMessage());
                if (e.getCause() != null) System.out.println("      Causa interna: " + e.getCause().getMessage());
            }

        } catch (Exception e) {
            System.err.println("   -> ERROR inesperado en login: " + e.getMessage());
        }

        // -------------------------------------------------------------
        // 5. TEST: changePassword
        // -------------------------------------------------------------
        try {
            System.out.println("\n5. [changePassword] - Probando cambio de contraseña...");
            if (idGenerado != null) {
                // Caso 1: Mismas contraseñas
                System.out.println("   [changePassword] - Intentando cambiar por la misma clave...");
                try {
                    service.changePassword(idGenerado, "pass1234", "pass1234");
                    System.err.println("   -> ERROR: Debería rechazar contraseñas idénticas.");
                } catch (Exception e) {
                    System.out.println("   -> OK: Rechazado por ser iguales: " + e.getMessage());
                    if (e.getCause() != null) System.out.println("      Causa interna: " + e.getCause().getMessage());
                }

                // Caso 2: Cambio exitoso
                System.out.println("   [changePassword] - Cambiando de 'pass1234' a 'passNueva999'...");
                service.changePassword(idGenerado, "pass1234", "passNueva999");
                System.out.println("   -> OK: Contraseña actualizada.");

                // Comprobar login con la nueva contraseña
                service.login("jdoe@example.com", "passNueva999");
                System.out.println("   -> OK: Login verificado con la nueva clave.");
            }
        } catch (Exception e) {
            System.err.println("   -> ERROR en changePassword: " + e.getMessage());
            if (e.getCause() != null) System.err.println("      Causa interna: " + e.getCause().getMessage());
        }

        System.out.println("\n=======================================================");
        System.out.println("                PRUEBAS FINALIZADAS                    ");
        System.out.println("=======================================================");

        // Cerramos el contexto para liberar conexiones de la base de datos
        context.close();
    }
}
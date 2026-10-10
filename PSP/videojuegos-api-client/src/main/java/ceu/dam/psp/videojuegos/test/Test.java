package ceu.dam.psp.videojuegos.client;

import ceu.dam.psp.videojuegos.client.VideojuegoApiClient;
import ceu.dam.psp.videojuegos.client.VideojuegoApiClientImpl;
import ceu.dam.psp.videojuegos.exceptions.ApiException;
import ceu.dam.psp.videojuegos.exceptions.NotFoundException;
import ceu.dam.psp.videojuegos.model.Videojuego;

public class Test {

    public static void main(String[] args) {
        // Sustituye por el UUID generado en crudcrud.com (ejemplo: "4d7a8b9c1e2f...")
        String uuidUrl = "TU_UUID_DE_CRUDCRUD"; 
        VideojuegoApiClient client = new VideojuegoApiClientImpl(uuidUrl);

        System.out.println("=== INICIO DE PRUEBAS DE LA API ===\n");

        String idCreado = null;

        // 1. Probar inserción (CREATE)
        try {
            System.out.println("1. Probando create()...");
            Videojuego nuevo = new Videojuego();
            // Ajusta los setters según los nombres exactos en tu clase Videojuego
            nuevo.setNombre("The Legend of Zelda");
            nuevo.setAñoPublicacion(1986);

            idCreado = client.create(nuevo);
            System.out.println("-> Creado con éxito. ID asignado: " + idCreado);
        } catch (ApiException e) {
            System.err.println("-> Error en create: " + e.getMessage());
        }

        // 2. Probar búsqueda por ID existente (FIND BY ID)
        if (idCreado != null) {
            try {
                System.out.println("\n2. Probando findById() con registro existente...");
                Videojuego obtenido = client.findById(idCreado);
                System.out.println("-> Recuperado con éxito: " + obtenido);
            } catch (NotFoundException | ApiException e) {
                System.err.println("-> Error en findById: " + e.getMessage());
            }
        }

        // 3. Probar actualización (UPDATE)
        if (idCreado != null) {
            try {
                System.out.println("\n3. Probando update()...");
                Videojuego paraActualizar = new Videojuego();
                paraActualizar.setId(idCreado);
                paraActualizar.setNombre("Zelda: Tears of the Kingdom");
                paraActualizar.setAñoPublicacion(2023);

                client.update(paraActualizar);
                System.out.println("-> Actualizado correctamente.");
            } catch (NotFoundException | ApiException e) {
                System.err.println("-> Error en update: " + e.getMessage());
            }
        }

        // 4. Probar eliminación (DELETE)
        if (idCreado != null) {
            try {
                System.out.println("\n4. Probando delete()...");
                client.delete(idCreado);
                System.out.println("-> Eliminado correctamente.");
            } catch (NotFoundException | ApiException e) {
                System.err.println("-> Error en delete: " + e.getMessage());
            }
        }

        // 5. Probar control de excepciones (FIND BY ID INEXISTENTE)
        try {
            System.out.println("\n5. Probando findById() con ID que ya no existe (esperando NotFoundException)...");
            String idInexistente = (idCreado != null) ? idCreado : "id_no_valido_12345";
            client.findById(idInexistente);
            System.err.println("-> Fallo del test: Debería haber lanzado NotFoundException");
        } catch (NotFoundException e) {
            System.out.println("-> Éxito: Excepción esperada capturada -> " + e.getMessage());
        } catch (ApiException e) {
            System.err.println("-> Error inesperado de API: " + e.getMessage());
        }

        System.out.println("\n=== FIN DE LAS PRUEBAS ===");
    }
}
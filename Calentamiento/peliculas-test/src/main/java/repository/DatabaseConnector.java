package repository;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {

    // Configuración de la base de datos
    private static final String URL = "jdbc:mariadb://localhost:3306/blas-db";
    private static final String USER = "root";
    private static final String PASSWORD = "root";

    /**
     * Establece y devuelve una conexión a la base de datos MariaDB.
     *
     * @return Objeto Connection si tiene éxito, o null si falla.
     */
    public static Connection getConnection() {
        Connection connection = null;
        try {
            // Cargar el driver JDBC de MariaDB (Opcional en versiones modernas de Java, pero seguro)
            Class.forName("org.mariadb.jdbc.Driver");
            
            // Establecer la conexión
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("¡Conexión exitosa a la base de datos blas-db!");
            
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver de MariaDB no encontrado. Asegúrate de añadir la librería a tu proyecto.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Error de SQL: No se pudo conectar a la base de datos.");
            e.printStackTrace();
        }
        return connection;
    }
}
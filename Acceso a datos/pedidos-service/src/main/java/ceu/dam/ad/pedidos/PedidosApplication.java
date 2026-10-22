package ceu.dam.ad.pedidos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ceu.dam.ad.pedidos.model.ArticuloPedido;
import ceu.dam.ad.pedidos.model.Pedido;
import ceu.dam.ad.pedidos.service.PedidoException;
import ceu.dam.ad.pedidos.service.PedidoNotFoundException;
import ceu.dam.ad.pedidos.service.PedidoService;

@SpringBootApplication
public class PedidosApplication {

    public static void main(String[] args) {
        SpringApplication.run(PedidosApplication.class, args);
    }

    @Bean
    public CommandLineRunner testRunner(PedidoService pedidoService) {
        return args -> {
            System.out.println("\n========== INICIO DE PRUEBAS DEL SERVICIO ==========\n");

            try {
                // 1. Preparar artículos de prueba
                // Artículo exento de IVA (100.00) - Necronomicón exento de tasas imperiales
                ArticuloPedido artExento = new ArticuloPedido();
                artExento.setCodBarras("NECRO-666");
                artExento.setDescripcionArticulo("Grimorio Necronomicón encuadernado en piel de orco");
                artExento.setPrecioSinIva(new BigDecimal("100.00"));
                artExento.setExentoIva(true);

                // Artículo NO exento con 21% de IVA (200.00 -> 242.00 con IVA) - Sable de Luz
                ArticuloPedido artNoExento = new ArticuloPedido();
                artNoExento.setCodBarras("SABER-KYBER-01");
                artNoExento.setDescripcionArticulo("Sable de Luz Sith con Cristal Kyber sintético");
                artNoExento.setPrecioSinIva(new BigDecimal("200.00"));
                artNoExento.setExentoIva(false);

                // 2. Crear pedido y asociar artículos
                Pedido nuevoPedido = new Pedido();
                nuevoPedido.setFechaPedido(LocalDate.now());

                List<ArticuloPedido> articulos = new ArrayList<>();
                articulos.add(artExento);
                articulos.add(artNoExento);
                nuevoPedido.setArticulos(articulos);

                // 3. Probar crearPedido()
                System.out.println("--> Guardando nuevo pedido...");
                Pedido pedidoGuardado = pedidoService.crearPedido(nuevoPedido);
                
                System.out.println("ID generado: " + pedidoGuardado.getIdPedido());
                System.out.println("Subtotal calculado : " + pedidoGuardado.getSubtotal()); // Esperado: 300.00
                System.out.println("Impuestos calculados: " + pedidoGuardado.getImpuestos()); // Esperado: 42.00
                System.out.println("Total calculado    : " + pedidoGuardado.getTotal());    // Esperado: 342.00
                System.out.println();

                // 4. Probar consultarPedido()
                System.out.println("--> Consultando pedido con ID " + pedidoGuardado.getIdPedido() + "...");
                Pedido pedidoConsultado = pedidoService.consultarPedido(pedidoGuardado.getIdPedido());
                System.out.println("Pedido recuperado correctamente con " 
                        + pedidoConsultado.getArticulos().size() + " artículos.");
                System.out.println();

                // 5. Probar buscarPedidosArticulo()
                System.out.println("--> Buscando pedidos que contengan el código 'NECRO-666'...");
                List<Long> pedidosEncontrados = pedidoService.buscarPedidosArticulo("NECRO-666");
                System.out.println("IDs de pedidos encontrados: " + pedidosEncontrados);
                System.out.println();

                // 6. Probar control de excepciones (búsqueda inexistente)
                System.out.println("--> Probando excepción para código inexistente 'ANILLO-UNICO-404'...");
                try {
                    pedidoService.buscarPedidosArticulo("ANILLO-UNICO-404");
                } catch (PedidoNotFoundException e) {
                    System.out.println("Excepción capturada con éxito: " + e.getMessage());
                }

            } catch (PedidoException | PedidoNotFoundException e) {
                System.err.println("Error en la ejecución de la prueba: " + e.getMessage());
                e.printStackTrace();
            }

            System.out.println("\n========== FIN DE PRUEBAS DEL SERVICIO ==========\n");
        };
    }
}
package ceu.api.test.server.controler;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.web.bind.annotation.RestController;

import ceu.api.test.server.model.Producto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class ProductoControler {
	@GetMapping("/producto/{codBarras}") //solo con PK
	public Producto getProductoByCodBarras(@PathVariable String codBarras) {
		Producto p = new Producto();
		p.setCodBarras(codBarras);
		p.setDescripcion("Galletas Oreo");
		p.setPrecio(BigDecimal.valueOf(32.42));
		p.setFechaCaducidad(LocalDate.of(2027, 10, 1));
		return p;
	}
}

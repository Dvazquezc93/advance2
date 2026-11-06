package ceu.envios.api.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.envios.api.server.model.Envio;
import java.math.BigDecimal;
import java.util.List;


public interface EnvioRepository extends JpaRepository<Envio, Long> {
List<Envio> findByTemperaturaCelsiusGreaterThan(Double temperaturaCelsius);
List<Envio> findByCodigoSeguimientoIn(List<String> codigos);
List<Envio> findAllByEstado(String estado);
}

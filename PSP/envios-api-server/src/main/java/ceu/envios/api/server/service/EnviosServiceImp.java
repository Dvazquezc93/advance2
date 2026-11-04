package ceu.envios.api.server.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ceu.envios.api.server.model.Envio;
import ceu.envios.api.server.repository.EnvioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class EnviosServiceImp implements EnviosService{
	
	private EnvioRepository repo;

	@Override
	public List<Envio> detectarEnviosEnRiesgoTermico(double limiteTemperatura) throws IllegalArgumentException {
		if(limiteTemperatura>50||limiteTemperatura<-50) {
			throw new IllegalArgumentException("la temperatura esta fuera del limite");
		}
		return repo.findByTemperaturaCelsiusGreatherThan(BigDecimal.valueOf(limiteTemperatura));
	}

	@Override
	@Transactional
	public long actualizarEstadoLoteReciente(List<String> codigos, String nuevoEstado)
			throws EnvioNoEncontradoException, IllegalArgumentException {
		
			if (codigos.isEmpty()) {
				throw new IllegalArgumentException("La lista de codigos esta vacia");
			}
			List<Envio> envios =repo.findByCodigoSeguimientoIn(codigos);
			if (envios.size()!= codigos.size()) {
				throw new  EnvioNoEncontradoException("Hay algun pedido que no existe");
			}
			envios = envios.stream().filter(e-> e.getFechaRegistro().isAfter(LocalDateTime.now().minusHours(24))).toList();
			 envios.stream().forEach(e->e.setEstado(nuevoEstado));
			 repo.saveAll(envios);
			 return envios.size();
		
	}

	@Override
	public Envio registrarNuevoEnvio(Envio nuevoEnvio)
			throws PoliticaTransporteInvalidaException, EstadoEnvioInvalidoException {
		
			if (nuevoEnvio.getPesoKg().compareTo(BigDecimal.valueOf(150))>0) {
				throw new PoliticaTransporteInvalidaException("El Limite del peso esta por encima");
			}
			else if (!nuevoEnvio.getEstado().equals("REGISTRADO")||!nuevoEnvio.getEstado().equals("ENTREGADO")) {
				throw new EstadoEnvioInvalidoException("El estado del envio no es válido");
			}
			nuevoEnvio.setCodigoSeguimiento(UUID.randomUUID().toString());
			return repo.save(nuevoEnvio);
	}

	@Override
	public Envio obtenerEnvioPesadoPrioritario() throws EstadoEnvioInvalidoException {
		List<Envio> envios = repo.findAllByEstado("PENDIENTE");
		if (envios.isEmpty()) {
			throw new EstadoEnvioInvalidoException("No hay ningún pedido pendiente");
		}
		return envios.stream().max((a,b)->a.getPesoKg().compareTo(b.getPesoKg())).get();
	}

	

}

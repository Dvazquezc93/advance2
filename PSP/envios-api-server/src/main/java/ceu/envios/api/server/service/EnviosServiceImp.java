package ceu.envios.api.server.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import ceu.envios.api.server.model.Envio;
import ceu.envios.api.server.repository.EnvioRepository;
@Service
public class EnviosServiceImp implements EnviosService{
	@Autowired
	private EnvioRepository repo;

	@Override
	public List<Envio> detectarEnviosEnRiesgoTermico(double limiteTemperatura) throws IllegalArgumentException {
		if(limiteTemperatura>50||limiteTemperatura<-50) {
			throw new IllegalArgumentException("la temperatura esta fuera del limite");
		}
		return repo.findByTemperaturaCelsiusGreatherThan(BigDecimal.valueOf(limiteTemperatura));
	}

	@Override
	public long actualizarEstadoLoteReciente(List<String> codigos, String nuevoEstado)
			throws EnvioNoEncontradoException, IllegalArgumentException {
		try {
			if (codigos.isEmpty()) {
				throw new IllegalArgumentException("La lista de codigos esta vacia");
			}
			List<Envio> envios =repo.findByCodigoSeguimientoIN(codigos);
			if (envios.size()!= codigos.size()) {
				throw new  EnvioNoEncontradoException("");
			}
		
		} catch (DataAccessException e) {
			throw new EnvioNoEncontradoException("No se ha podido actualizar el estado",e);
		}
	}

	@Override
	public Envio registrarNuevoEnvio(Envio nuevoEnvio)
			throws PoliticaTransporteInvalidaException, EstadoEnvioInvalidoException {
		try {
			
		} catch (DataAccessException e) {
			// TODO: handle exception
		}
	}

	@Override
	public Envio obtenerEnvioPesadoPrioritario() throws EstadoEnvioInvalidoException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Envio registrarNuevoEnvio(Envio nuevoEnvio)
			throws PoliticaTransporteInvalidaException, EstadoEnvioInvalidoException {
		// TODO Auto-generated method stub
		return null;
	}

}

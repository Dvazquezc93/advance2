package ceu.dam.ad.orm.practicas.basicas.ejercicio3.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import ceu.dam.ad.orm.practicas.basicas.ejercicio3.modelo.CentroComercial;
import ceu.dam.ad.orm.practicas.basicas.ejercicio3.modelo.Marca;
import ceu.dam.ad.orm.practicas.basicas.ejercicio3.modelo.Pais;
import ceu.dam.ad.orm.practicas.basicas.ejercicio3.modelo.Tienda;
import ceu.dam.ad.orm.practicas.basicas.ejercicio3.repository.CentroComercialRepository;
import ceu.dam.ad.orm.practicas.basicas.ejercicio3.repository.MarcaRepository;
import ceu.dam.ad.orm.practicas.basicas.ejercicio3.repository.PaisRepository;
import ceu.dam.ad.orm.practicas.basicas.ejercicio3.repository.TiendaRepository;

@Service
public class ComercialServiceImpl implements ComercialService {
	@Autowired
	private PaisRepository repoP;
	@Autowired
	private MarcaRepository repoM;
	@Autowired
	private CentroComercialRepository repoC;
	@Autowired
	private TiendaRepository repoT;


	@Override
	public List<Pais> buscarPaises(String filtro) throws ComercialException {
		try {
			return repoP.findByDescripcionStartingWith(filtro);

		} catch (DataAccessException e) {
			throw new ComercialException("Error al buscar el pais en la base de datos", e);
		}
	}

	@Override
	public void insertarMarca(Marca marca) throws ComercialException {
		try {
			repoM.save(marca);

		} catch (DataAccessException e) {
			throw new ComercialException("Error al insertar la marca en la base de datos", e);
		}
	}

	@Override
	public void insertarCentroComercial(CentroComercial cc) throws ComercialException {
		try {

			repoC.save(cc);

		} catch (DataAccessException e) {
			throw new ComercialException("Error al insertar centro comercial en la base de datos", e);
		}
	}

	@Override
	public CentroComercial consultarCentroComercial(String uuidCentro) throws ComercialException, NotFoundException {
		try { 
			UUID uId = UUID.fromString(uuidCentro);
			return repoC.findById(uId).orElseThrow( ()->  new NotFoundException("No hay centro comercial en la base de datos"));
			
		} catch (DataAccessException e) {
			throw new ComercialException("Error al consultar centro comercial en la base de datos",e);
		}
	}

	@Override
	public Tienda consularTienda(Long idTienda) throws ComercialException, NotFoundException {
		try { 
			return repoT.findById(idTienda).orElseThrow(()-> new NotFoundException("No hay centro comercial en la base de datos"));  
			
		} catch (DataAccessException e) {
			throw new ComercialException("Error al consultar tienda en la base de datos",e);
		}
	}

	@Override
	public void borrarTienda(Long idTienda) throws ComercialException {
		try { 
			repoT.deleteById(idTienda);  
			
		} catch (DataAccessException e) {
			throw new ComercialException("Error al borrar centro comercial en la base de datos",e);
		}
	}

	@Override
	public void borrarCentroComercial(String uuidCentro) throws ComercialException {
		try { 
			UUID uId =UUID.fromString(uuidCentro);
			repoC.deleteById(uId);  
			
		} catch (DataAccessException e) {
			throw new ComercialException("Error al borrar centro comercial en la base de datos",e);
		}
	}

}

package ceu.dam.ad.orm.practicas.basicas.ejercicio2.service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import ceu.dam.ad.orm.practicas.basicas.ejercicio2.model.Articulo;
import ceu.dam.ad.orm.practicas.basicas.ejercicio2.model.Cliente;
import ceu.dam.ad.orm.practicas.basicas.ejercicio2.model.Pedido;
import ceu.dam.ad.orm.practicas.basicas.ejercicio2.repository.ArticuloRepository;
import ceu.dam.ad.orm.practicas.basicas.ejercicio2.repository.ClienteRepository;
import ceu.dam.ad.orm.practicas.basicas.ejercicio2.repository.PedidoRepository;
@Service
public class PedidosClientesServiceImpl implements PedidosClientesService {
	@Autowired
	private ClienteRepository repoCl;
	@Autowired
	private PedidoRepository repoPe;
	@Autowired
	private  ArticuloRepository repoArt;
	
	@Override
	public void crearCliente(Cliente cliente) throws PedidosClientesServiceException {
		try {
			repoCl.save(cliente);
		} catch (DataAccessException e) {
			throw new  PedidosClientesServiceException("Error creando ese cliente en la base de datos", e);
		}
	}


	@Override
	public Pedido crearPedido(Pedido pedido) throws PedidosClientesServiceException {
		try {
			AtomicInteger contador = new AtomicInteger(1);
			pedido.getLineas().stream().forEach(p-> p.setNumLinea(contador.getAndIncrement()));
			return repoPe.save(pedido);
			
		} catch (DataAccessException e) {
			throw new  PedidosClientesServiceException("Error creando ese serie en la base de datos", e);
		}
	}


	@Override
	public Articulo crearArticulo(Articulo articulo) throws PedidosClientesServiceException {
	try {
		return repoArt.save(articulo);
	} catch (DataAccessException e) {
		throw new  PedidosClientesServiceException("Error creando ese articulo en la base de datos", e);
	}
	}
	
	@Override
	public void actualizarCliente(Cliente cliente) throws PedidosClientesServiceException {
		try {
			repoCl.save(cliente);
		} catch (DataAccessException e) {
			throw new  PedidosClientesServiceException("Error actualizado ese cliente en la base de datos", e);
		}
	}


	@Override
	public Cliente consultarCliente(String dni) throws NotFoundException, PedidosClientesServiceException {
		try {
			return repoCl.findById(dni).orElseThrow(()-> new NotFoundException("No existe ese cliente con ese dni "+dni));
		} catch (DataAccessException e) {
			throw new  PedidosClientesServiceException("Error consultando ese cliente en la base de datos", e);
		}
	}


	@Override
	public Articulo consultarArticulo(Long idArticulo) throws NotFoundException, PedidosClientesServiceException {
		try {
			return repoArt.findById(idArticulo).orElseThrow(()-> new NotFoundException("No existe ese artículo con ese id "+idArticulo));
		} catch (DataAccessException e) {
			throw new  PedidosClientesServiceException("Error consultando ese artículo en la base de datos", e);
		}
	}


	@Override
	public Pedido consultarPedido(String uuid) throws NotFoundException, PedidosClientesServiceException {
		try {
			UUID id = UUID.fromString(uuid);
			return repoPe.findById(id).orElseThrow(()-> new NotFoundException("No existe ese pedido con ese id "+ uuid));
		} catch (DataAccessException e) {
			throw new  PedidosClientesServiceException("Error consultando ese pedido en la base de datos", e);
		}
	}


	@Override
	public List<Pedido> consultarPedidosByArticulo(String descripcionArticulo)
			throws PedidosClientesServiceException, NotFoundException {
		try {
			List<Pedido> pedido =repoPe.findByLineasArticuloDescripcion(descripcionArticulo);
			if (pedido.isEmpty()) {
				throw new NotFoundException("No existe ese pedido con esa descripcion "+ descripcionArticulo);
			}
			return pedido;
		} catch (DataAccessException e) {
			throw new  PedidosClientesServiceException("Error consultando ese artículo en la base de datos", e);
		}
	}
	
	
	
}

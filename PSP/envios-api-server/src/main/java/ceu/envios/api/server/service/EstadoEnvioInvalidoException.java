package ceu.envios.api.server.service;

public class EstadoEnvioInvalidoException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1722660444280906311L;

	public EstadoEnvioInvalidoException() {
	}

	public EstadoEnvioInvalidoException(String message) {
		super(message);
	}

	public EstadoEnvioInvalidoException(Throwable cause) {
		super(cause);
	}

	public EstadoEnvioInvalidoException(String message, Throwable cause) {
		super(message, cause);
	}

	public EstadoEnvioInvalidoException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}

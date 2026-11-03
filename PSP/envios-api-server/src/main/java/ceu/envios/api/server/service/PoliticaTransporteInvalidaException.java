package ceu.envios.api.server.service;

public class PoliticaTransporteInvalidaException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5544759669948259757L;

	public PoliticaTransporteInvalidaException() {
	}

	public PoliticaTransporteInvalidaException(String message) {
		super(message);
	}

	public PoliticaTransporteInvalidaException(Throwable cause) {
		super(cause);
	}

	public PoliticaTransporteInvalidaException(String message, Throwable cause) {
		super(message, cause);
	}

	public PoliticaTransporteInvalidaException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}

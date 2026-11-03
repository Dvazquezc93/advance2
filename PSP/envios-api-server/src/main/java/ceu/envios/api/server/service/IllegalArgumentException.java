package ceu.envios.api.server.service;

public class IllegalArgumentException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3332292397775231476L;

	public  IllegalArgumentException() {
	}

	public  IllegalArgumentException(String message) {
		super(message);
	}

	public  IllegalArgumentException(Throwable cause) {
		super(cause);
	}

	public IllegalArgumentException(String message, Throwable cause) {
		super(message, cause);
	}

	public  IllegalArgumentException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}

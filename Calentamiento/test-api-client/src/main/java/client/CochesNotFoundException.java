package client;

public class CochesNotFoundException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5648404659503967221L;

	public CochesNotFoundException() {
	}

	public CochesNotFoundException(String message) {
		super(message);
	}

	public CochesNotFoundException(Throwable cause) {
		super(cause);
	}

	public CochesNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public CochesNotFoundException(String message, Throwable cause, boolean enableSuppression,	boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}

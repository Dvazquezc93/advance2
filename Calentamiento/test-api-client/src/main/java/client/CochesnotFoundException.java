package client;

public class CochesnotFoundException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5648404659503967221L;

	public CochesnotFoundException() {
	}

	public CochesnotFoundException(String message) {
		super(message);
	}

	public CochesnotFoundException(Throwable cause) {
		super(cause);
	}

	public CochesnotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public CochesnotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}

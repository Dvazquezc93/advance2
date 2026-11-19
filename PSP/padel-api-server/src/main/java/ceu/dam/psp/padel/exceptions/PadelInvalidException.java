package ceu.dam.psp.padel.exceptions;

public class PadelInvalidException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4711688600293898126L;

	public PadelInvalidException() {
	}
	public PadelInvalidException(String message) {
		super(message);
	}

	public PadelInvalidException(Throwable cause) {
		super(cause);
	}

	public PadelInvalidException(String message, Throwable cause) {
		super(message, cause);
	}

	public PadelInvalidException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
}

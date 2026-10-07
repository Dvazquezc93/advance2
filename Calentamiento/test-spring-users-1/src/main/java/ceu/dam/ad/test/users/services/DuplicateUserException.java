package ceu.dam.ad.test.users.services;

public class DuplicateUserException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6169626021185748777L;

	public DuplicateUserException() {
	}

	public DuplicateUserException(String message) {
		super(message);
	}

	public DuplicateUserException(Throwable cause) {
		super(cause);
	}

	public DuplicateUserException(String message, Throwable cause) {
		super(message, cause);
	}

	public DuplicateUserException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}

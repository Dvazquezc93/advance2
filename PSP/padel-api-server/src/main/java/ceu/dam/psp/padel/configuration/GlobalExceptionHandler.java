package ceu.dam.psp.padel.configuration;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import ceu.dam.psp.padel.exceptions.PadelInvalidDataException;
import ceu.dam.psp.padel.exceptions.PadelInvalidException;
import ceu.dam.psp.padel.exceptions.PadelNotFoundException;
import lombok.extern.log4j.Log4j2;

@RestControllerAdvice
@Log4j2
public class GlobalExceptionHandler {
	@ExceptionHandler(PadelNotFoundException.class)
	public ResponseEntity<String> handle(PadelNotFoundException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(e.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<String> handle(MethodArgumentNotValidException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND.value())
				.body(e.getFieldError().getField() + " : " + e.getFieldError().getDefaultMessage());
	}

	@ExceptionHandler( Exception.class)
	public ResponseEntity<String> handle(Exception e) {
		log.error("Error inesperado" + e.getMessage(), e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	@ExceptionHandler( PadelInvalidDataException.class)
	public ResponseEntity<String> handle(PadelInvalidDataException e) {
		log.error("Error inesperado" + e.getMessage(), e);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler( PadelInvalidException.class)
	public ResponseEntity<String> handle(PadelInvalidException e) {
		log.error("Error inesperado" + e.getMessage(), e);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
}

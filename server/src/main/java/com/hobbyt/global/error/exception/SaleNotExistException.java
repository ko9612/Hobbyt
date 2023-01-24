package com.hobbyt.global.error.exception;

public class SaleNotExistException extends RuntimeException {
	public SaleNotExistException() {
	}

	public SaleNotExistException(String message) {
		super(message);
	}

	public SaleNotExistException(String message, Throwable cause) {
		super(message, cause);
	}
}

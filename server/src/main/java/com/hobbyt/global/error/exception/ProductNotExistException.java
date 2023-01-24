package com.hobbyt.global.error.exception;

public class ProductNotExistException extends RuntimeException {
	public ProductNotExistException() {
	}

	public ProductNotExistException(String message) {
		super(message);
	}

	public ProductNotExistException(String message, Throwable cause) {
		super(message, cause);
	}
}

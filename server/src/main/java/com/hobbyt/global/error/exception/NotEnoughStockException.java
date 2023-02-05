package com.hobbyt.global.error.exception;

public class NotEnoughStockException extends RuntimeException {
	public NotEnoughStockException() {
	}

	public NotEnoughStockException(String message) {
		super(message);
	}

	public NotEnoughStockException(String message, Throwable cause) {
		super(message, cause);
	}
}

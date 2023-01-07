package com.hobbyt.global.error.exception;

public class TokenNotValidException extends RuntimeException {
	public TokenNotValidException() {
	}

	public TokenNotValidException(String message) {
		super(message);
	}

	public TokenNotValidException(String message, Throwable cause) {
		super(message, cause);
	}
}

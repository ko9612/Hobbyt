package com.hobbyt.global.exception;

public class InputNotFoundException extends RuntimeException {
	public InputNotFoundException() {
	}

	public InputNotFoundException(String message) {
		super(message);
	}

	public InputNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}

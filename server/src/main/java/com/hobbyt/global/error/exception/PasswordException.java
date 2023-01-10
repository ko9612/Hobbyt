package com.hobbyt.global.error.exception;

public class PasswordException extends RuntimeException {
	public PasswordException() {
	}

	public PasswordException(String message) {
		super(message);
	}

	public PasswordException(String message, Throwable cause) {
		super(message, cause);
	}
}

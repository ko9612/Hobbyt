package com.hobbyt.global.error.exception;

public class LoginFailException extends RuntimeException {
	public LoginFailException() {
	}

	public LoginFailException(String message) {
		super(message);
	}

	public LoginFailException(String message, Throwable cause) {
		super(message, cause);
	}
}

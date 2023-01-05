package com.hobbyt.global.error.exception;

public class CMailException extends RuntimeException {
	public CMailException() {
	}

	public CMailException(String message) {
		super(message);
	}

	public CMailException(String message, Throwable cause) {
		super(message, cause);
	}
}

package com.hobbyt.global.error.exception;

public class WriterExistException extends RuntimeException {
	public WriterExistException() {
	}

	public WriterExistException(String message) {
		super(message);
	}

	public WriterExistException(String message, Throwable cause) {
		super(message, cause);
	}
}

package com.hobbyt.global.error.exception;

public class PostNotExistException extends RuntimeException {
	public PostNotExistException() {
	}

	public PostNotExistException(String message) {
		super(message);
	}

	public PostNotExistException(String message, Throwable cause) {
		super(message, cause);
	}
}

package com.hobbyt.global.error.exception;

public class ImpossibleCancelException extends RuntimeException {
	public ImpossibleCancelException() {
	}

	public ImpossibleCancelException(String message) {
		super(message);
	}

	public ImpossibleCancelException(String message, Throwable cause) {
		super(message, cause);
	}
}

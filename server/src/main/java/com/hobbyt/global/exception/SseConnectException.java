package com.hobbyt.global.exception;

public class SseConnectException extends RuntimeException {
	public SseConnectException() {
		super();
	}

	public SseConnectException(String message) {
		super(message);
	}

	public SseConnectException(String message, Throwable cause) {
		super(message, cause);
	}
}

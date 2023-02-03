package com.hobbyt.global.error.exception;

public class PaymentException extends RuntimeException {
	public PaymentException() {
	}

	public PaymentException(String message) {
		super(message);
	}

	public PaymentException(String message, Throwable cause) {
		super(message, cause);
	}
}

package com.hobbyt.global.exception;

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

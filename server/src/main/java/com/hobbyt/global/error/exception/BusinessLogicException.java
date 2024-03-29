package com.hobbyt.global.error.exception;

import org.springframework.http.HttpStatus;

public class BusinessLogicException extends RuntimeException {
	private final ExceptionCode exceptionCode;

	public BusinessLogicException(ExceptionCode exceptionCode) {
		super(exceptionCode.getMessage());
		this.exceptionCode = exceptionCode;
	}

	public BusinessLogicException(ExceptionCode exceptionCode, String message) {
		super(message);
		this.exceptionCode = exceptionCode;
	}

	public HttpStatus getStatus() {
		return exceptionCode.getStatus();
	}
}

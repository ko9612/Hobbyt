package com.hobbyt.global.error.exception;

import org.springframework.http.HttpStatus;

public class TokenException extends RuntimeException {
	private final ExceptionCode exceptionCode;

	public TokenException(ExceptionCode exceptionCode) {
		super(exceptionCode.getMessage());
		this.exceptionCode = exceptionCode;
	}

	public HttpStatus getStatus() {
		return exceptionCode.getStatus();
	}
}

package com.hobbyt.global.error.exception;

public class MemberAlreadyLoggedInException extends RuntimeException {
	public MemberAlreadyLoggedInException() {
	}

	public MemberAlreadyLoggedInException(String message) {
		super(message);
	}

	public MemberAlreadyLoggedInException(String message, Throwable cause) {
		super(message, cause);
	}
}

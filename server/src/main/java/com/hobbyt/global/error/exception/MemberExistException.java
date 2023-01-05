package com.hobbyt.global.error.exception;

public class MemberExistException extends RuntimeException {
	public MemberExistException() {
	}

	public MemberExistException(String message) {
		super(message);
	}

	public MemberExistException(String message, Throwable cause) {
		super(message, cause);
	}
}

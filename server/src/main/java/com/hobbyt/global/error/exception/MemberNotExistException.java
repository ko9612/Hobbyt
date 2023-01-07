package com.hobbyt.global.error.exception;

public class MemberNotExistException extends RuntimeException {
	public MemberNotExistException() {
	}

	public MemberNotExistException(String message) {
		super(message);
	}

	public MemberNotExistException(String message, Throwable cause) {
		super(message, cause);
	}
}

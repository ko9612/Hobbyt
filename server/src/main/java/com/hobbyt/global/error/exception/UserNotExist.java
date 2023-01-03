package com.hobbyt.global.error.exception;

public class UserNotExist extends RuntimeException {
	public UserNotExist() {
	}

	public UserNotExist(String message) {
		super(message);
	}

	public UserNotExist(String message, Throwable cause) {
		super(message, cause);
	}
}

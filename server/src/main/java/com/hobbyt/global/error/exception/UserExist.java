package com.hobbyt.global.error.exception;

public class UserExist extends RuntimeException {
	public UserExist() {
	}

	public UserExist(String message) {
		super(message);
	}

	public UserExist(String message, Throwable cause) {
		super(message, cause);
	}
}

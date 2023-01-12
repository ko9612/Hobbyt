package com.hobbyt.global.error.exception;

public class CommentNotExistException extends RuntimeException {
	public CommentNotExistException() {
	}

	public CommentNotExistException(String message) {
		super(message);
	}

	public CommentNotExistException(String message, Throwable cause) {
		super(message, cause);
	}
}

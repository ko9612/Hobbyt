package com.hobbyt.global.error.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;

// TODO 나중에 메시지, 국제화
@Getter
public enum ErrorCode {
	TOKEN_NOT_VALID_EXCEPTION("-1", "token error", HttpStatus.BAD_REQUEST);

	private final String code;
	private final String message;
	private final HttpStatus httpStatus;

	ErrorCode(String code, String message, HttpStatus httpStatus) {
		this.code = code;
		this.message = message;
		this.httpStatus = httpStatus;
	}
}

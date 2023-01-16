package com.hobbyt.global.error.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hobbyt.global.error.dto.ErrorResponse;
import com.hobbyt.global.error.exception.LoginFailException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

	@ExceptionHandler
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorResponse loginFailException(LoginFailException e) {
		log.error("[exceptionHandler] ex", e);
		return new ErrorResponse("401", "로그인 실패");
	}

	// 예시
	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse defaultException(Exception e) {
		log.error("[exceptionHandler] ex", e);
		return new ErrorResponse("404", "기본 예외 처리");
	}
}

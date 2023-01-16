package com.hobbyt.global.error.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hobbyt.global.error.dto.ErrorResponse;
import com.hobbyt.global.error.exception.MemberExistException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

	// 예시
	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse defaultException(MemberExistException e) {
		log.error("[exceptionHandler] ex", e);
		return new ErrorResponse("404", "이미 존재하는 회원");
	}
}

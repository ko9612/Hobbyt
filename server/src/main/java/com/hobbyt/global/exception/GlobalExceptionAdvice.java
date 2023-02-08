package com.hobbyt.global.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {
	@ExceptionHandler(BusinessLogicException.class)
	public ResponseEntity<String> handleBusinessLogicException(BusinessLogicException e) {
		log.error("[ExceptionAdvice] ex", e);
		return ResponseEntity.status(e.getStatus()).body(e.getMessage());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleException(Exception e) {
		log.error("[ExceptionAdvice] ex", e);
		return ResponseEntity.internalServerError().body(e.getMessage());
	}
}

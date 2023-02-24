package com.hobbyt.global.error.advice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.hobbyt.global.error.dto.FailValidationDto;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
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

	// validation 실패 >> @Validated
	@ExceptionHandler
	public ResponseEntity handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		log.error("[ExceptionAdvice] ex", e);
		List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
		List<FailValidationDto> errors = new ArrayList<>();
		for (FieldError fieldError : fieldErrors) {
			FailValidationDto error = FailValidationDto.builder()
				.defaultMessage(fieldError.getDefaultMessage())
				.field(fieldError.getField())
				.rejectedValue(fieldError.getRejectedValue())
				.build();
			errors.add(error);
		}

		return ResponseEntity.badRequest().body(errors);
	}

	// request body deserialize 실패
	@ExceptionHandler
	public ResponseEntity handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
		List<Map<String, String>> errors = new ArrayList<>();

		if (e.getRootCause() instanceof InvalidFormatException) {
			InvalidFormatException invalidFormatException = (InvalidFormatException)e.getRootCause();

			invalidFormatException.getPath().forEach(reference -> {
				Map<String, String> error = new HashMap<>();
				error.put(reference.getFieldName(), invalidFormatException.getOriginalMessage());
				errors.add(error);
			});
		}

		return ResponseEntity.badRequest().body(errors);
	}
}

package com.hobbyt.global.exception;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {
	MEMBER_NOT_FOUND(NOT_FOUND, "MEMBER_NOT_FOUND"),
	MEMBER_EMAIL_DUPLICATED(CONFLICT, "EMAIL_DUPLICATED"),

	AUTH_INVALID_PASSWORD(BAD_REQUEST, "INVALID_PASSWORD"),

	SALE_NOT_FOUND(NOT_FOUND, "SALE_NOT_FOUND"),

	PRODUCT_NOT_FOUND(NOT_FOUND, "PRODUCT_NOT_FOUND"),
	PRODUCT_STOCK_NOT_ENOUGH(CONFLICT, "STOCK_NOT_ENOUGH"),

	ORDER_NOT_FOUND(NOT_FOUND, "ORDER_NOT_FOUND"),

	POST_NOT_FOUND(NOT_FOUND, "POST_NOT_FOUND"),

	COMMENT_NOT_FOUND(NOT_FOUND, "COMMENT_NOT_FOUND"),

	ORDER_CANCEL_NOT_PERMITTED(CONFLICT, "ORDER_CANCEL_NOT_PERMITTED");

	private final HttpStatus status;
	private final String message;
}

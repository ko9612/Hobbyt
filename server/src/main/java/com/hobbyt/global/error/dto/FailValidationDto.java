package com.hobbyt.global.error.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FailValidationDto {
	private String defaultMessage;
	private String field;
	private Object rejectedValue;
}

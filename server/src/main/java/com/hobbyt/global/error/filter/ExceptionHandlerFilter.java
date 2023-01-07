package com.hobbyt.global.error.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hobbyt.global.error.code.ErrorCode;
import com.hobbyt.global.error.dto.ErrorResponse;
import com.hobbyt.global.error.exception.TokenNotValidException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		try {
			filterChain.doFilter(request, response);
		} catch (TokenNotValidException e) {
			log.error("[exceptionHandler] ex", e);
			setErrorResponse(response, ErrorCode.TOKEN_NOT_VALID_EXCEPTION);
		}
	}

	private void setErrorResponse(HttpServletResponse response, ErrorCode errorCode) {
		ObjectMapper objectMapper = new ObjectMapper();
		response.setStatus(errorCode.getHttpStatus().value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		ErrorResponse errorResponse = new ErrorResponse(errorCode.getCode(), errorCode.getMessage());
		try {
			response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

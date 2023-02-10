package com.hobbyt.global.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException, ServletException {
		if (isExpiredToken(request)) {
			response.setContentType("text/plain");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write("EXPIRED_TOKEN");
		}

		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	}

	private boolean isExpiredToken(HttpServletRequest request) {
		String error = (String)request.getAttribute("error");
		return error != null && error.equals("expired");
	}
}

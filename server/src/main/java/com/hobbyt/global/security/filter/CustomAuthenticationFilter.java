package com.hobbyt.global.security.filter;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hobbyt.domain.member.dto.request.LoginRequest;
import com.hobbyt.global.error.exception.InputNotFoundException;
import com.hobbyt.global.error.exception.MemberAlreadyLoggedInException;
import com.hobbyt.global.security.service.RedisService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;
	private final RedisService redisService;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
		throws AuthenticationException {

		LoginRequest loginRequest = getLoginRequest(request);

		validateAlreadyLoggedIn(loginRequest);

		UsernamePasswordAuthenticationToken authenticationToken =
			new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

		setDetails(request, authenticationToken);
		return authenticationManager.authenticate(authenticationToken);
	}

	private void validateAlreadyLoggedIn(LoginRequest loginRequest) {
		if (redisService.getRefreshToken(loginRequest.getEmail()) != null) {
			throw new MemberAlreadyLoggedInException();
		}
	}

	private LoginRequest getLoginRequest(HttpServletRequest request) {
		ObjectMapper objectMapper = new ObjectMapper();
		LoginRequest loginRequest;
		try {
			loginRequest = objectMapper.readValue(request.getInputStream(), LoginRequest.class);
		} catch (IOException e) {
			throw new InputNotFoundException();
		}
		return loginRequest;
	}
}

package com.hobbyt.global.security.filter;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
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
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;
import com.hobbyt.global.security.service.RedisService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;
	private final RedisService redisService;
	private final JwtTokenProvider jwtTokenProvider;

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

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authentication) throws ServletException, IOException {

		MemberDetails principal = (MemberDetails)authentication.getPrincipal();
		String accessToken = jwtTokenProvider.createAccessToken(principal.getEmail(), principal.getAuthority());
		String refreshToken = jwtTokenProvider.createRefreshToken(principal.getEmail());

		redisService.setRefreshToken(principal.getEmail(), refreshToken,
			jwtTokenProvider.calculateExpiration(refreshToken));

		response.addHeader(AUTH_HEADER, TOKEN_TYPE + " " + accessToken);
		response.addHeader(REFRESH_TOKEN, refreshToken);
	}
}
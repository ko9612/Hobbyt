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
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.dto.LoginRequest;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager;
	private final RedisService redisService;
	private final JwtTokenProvider jwtTokenProvider;

	// TODO catch 처리로 response.sendError
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
		throws AuthenticationException {

		Authentication authenticate = null;
		try {
			LoginRequest loginRequest = getLoginRequest(request);

			UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

			setDetails(request, authenticationToken);
			authenticate = authenticationManager.authenticate(authenticationToken);
		} catch (Exception e) {
			log.error("[exceptionHandler] ex", e);
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}

		return authenticate;
	}

	private LoginRequest getLoginRequest(HttpServletRequest request) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		LoginRequest loginRequest = objectMapper.readValue(request.getInputStream(), LoginRequest.class);

		return loginRequest;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authentication) throws ServletException, IOException {

		MemberDetails memberDetails = (MemberDetails)authentication.getPrincipal();
		Member member = memberDetails.getMember();
		String accessToken = jwtTokenProvider.createAccessToken(member.getEmail(), member.getAuthority());
		String refreshToken = jwtTokenProvider.createRefreshToken(member.getEmail());

		saveRefreshToken(member, refreshToken);

		setHeader(response, accessToken, refreshToken);
	}

	private void setHeader(HttpServletResponse response, String accessToken, String refreshToken) {
		response.addHeader(AUTH_HEADER, TOKEN_TYPE + " " + accessToken);
		response.addHeader(REFRESH_TOKEN_HEADER, refreshToken);
	}

	private void saveRefreshToken(Member member, String refreshToken) {
		redisService.setValue(member.getEmail(), refreshToken,
			jwtTokenProvider.calculateExpiration(refreshToken));
	}
}

package com.hobbyt.global.security.filter;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.io.IOException;

import javax.security.sasl.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;
	private final RedisService redisService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		try {
			String authHeader = request.getHeader(AUTH_HEADER);

			if (authHeaderIsInvalid(authHeader)) {
				filterChain.doFilter(request, response);
				return;
			}

			String accessToken = resolveToken(request);

			checkTokenIsBlackList(accessToken);

			setAuthenticationToSecurityContext(accessToken);
			filterChain.doFilter(request, response);
		} catch (Exception e) {
			log.error("[exceptionHandler] ex", e);
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}

		// filterChain.doFilter(request, response);
	}

	private void checkTokenIsBlackList(String accessToken) throws AuthenticationException {
		if (redisService.isBlackList(accessToken)) {
			throw new AuthenticationException();
		}
	}

	private String resolveToken(HttpServletRequest request) {
		return request.getHeader(AUTH_HEADER).substring(7);
	}

	private boolean authHeaderIsInvalid(String authHeader) {
		return authHeader == null || !authHeader.startsWith(TOKEN_TYPE);
	}

	private void setAuthenticationToSecurityContext(final String accessToken) {
		UserDetails userDetails = jwtTokenProvider.parseToken(accessToken);
		UsernamePasswordAuthenticationToken authentication =
			new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}

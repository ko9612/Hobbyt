package com.hobbyt.global.security.filter;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hobbyt.global.error.exception.TokenNotValidException;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;
	private final UserDetailsService userDetailsService;
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

			String accessToken = request.getHeader(AUTH_HEADER).substring(7);
			String email = jwtTokenProvider.parseEmail(accessToken);

			if (redisService.isBlackList(accessToken)) {
				throw new TokenNotValidException();
			}

			setAuthenticationToSecurityContext(email);

		} catch (Exception e) {
			log.error("[exceptionHandler] ex", e);
			// TODO 예외처리 고민, authenticationEntryPoint, accessDeniedHandler 파악
			throw new TokenNotValidException();
		}

		filterChain.doFilter(request, response);
	}

	private boolean authHeaderIsInvalid(String authHeader) {
		return authHeader == null || !authHeader.startsWith(TOKEN_TYPE);
	}

	private void setAuthenticationToSecurityContext(final String email) {
		MemberDetails memberDetails = (MemberDetails)userDetailsService.loadUserByUsername(email);
		Authentication authentication =
			new UsernamePasswordAuthenticationToken(memberDetails, null, memberDetails.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	/*@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		String authorization = request.getHeader(AUTH_HEADER);

		return authorization == null || !authorization.startsWith(TOKEN_TYPE);
	}*/

}

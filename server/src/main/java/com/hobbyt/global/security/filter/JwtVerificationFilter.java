package com.hobbyt.global.security.filter;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.io.IOException;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;
import com.hobbyt.global.security.service.MemberDetailsService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;
	private final MemberDetailsService memberDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		try {
			String accessToken = request.getHeader(AUTH_HEADER);

			String jws = accessToken.replace(TOKEN_TYPE + " ", "");
			Map<String, Object> claims = jwtTokenProvider.getClaims(jws).getBody();

			String email = (String)claims.get(JwtTokenProvider.CLAIM_EMAIL);
			MemberDetails memberDetails = (MemberDetails)memberDetailsService.loadUserByUsername(email);
			Authentication authentication = new UsernamePasswordAuthenticationToken(memberDetails, null,
				memberDetails.getAuthorities());

			SecurityContextHolder.getContext().setAuthentication(authentication);

		} catch (Exception e) {
			request.setAttribute("exception", e);
		}

		filterChain.doFilter(request, response);
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String authorization = request.getHeader(AUTH_HEADER);

		return authorization == null || !authorization.startsWith(TOKEN_TYPE);
	}

}

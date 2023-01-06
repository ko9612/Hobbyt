package com.hobbyt.global.security.handler;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;
import com.hobbyt.global.security.service.RedisService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisService redisService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
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

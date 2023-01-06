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

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws ServletException, IOException {

		JwtTokenProvider provider = new JwtTokenProvider();
		MemberDetails principal = (MemberDetails)authentication.getPrincipal();

		String accessToken = provider.createAccessToken(principal.getEmail(), principal.getAuthority());
		String refreshToken = provider.createRefreshToken(principal.getEmail());

		response.addHeader(AUTH_HEADER, TOKEN_TYPE + " " + accessToken);
		response.addHeader(REFRESH_TOKEN, refreshToken);
	}
}

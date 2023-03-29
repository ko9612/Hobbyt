package com.hobbyt.global.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisService redisService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		MemberDetails memberDetails = (MemberDetails)authentication.getPrincipal();

		String email = memberDetails.getEmail();
		String authority = memberDetails.getAuthority();

		String accessToken = jwtTokenProvider.createAccessToken(email, authority);
		String refreshToken = jwtTokenProvider.createRefreshToken(email);

		redisService.setValue(email, refreshToken, jwtTokenProvider.calculateExpiration(refreshToken));

		String targetUrl = createSuccessUri(accessToken, refreshToken);

		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

	private String createSuccessUri(String accessToken, String refreshToken) {
		// String targetUrl = "https://hobbyt-git-dev-ko9612.vercel.app/oauth";
		String targetUrl = "http://localhost:3000/oauth";

		return UriComponentsBuilder.fromUriString(targetUrl)
			.queryParam("AccessToken", accessToken)
			.queryParam("RefreshToken", refreshToken)
			.build().toUriString();
	}
}
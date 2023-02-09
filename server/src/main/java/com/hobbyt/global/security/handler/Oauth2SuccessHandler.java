package com.hobbyt.global.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

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

		// 프론트 엔드 수신 uri
		String uri = "http://localhost:3000/oauth?AccessToken=" + accessToken + "&RefreshToken=" + refreshToken;
		
		log.info("보내는 access token: {}", accessToken);
		log.info("보내는 refresh token: {}", refreshToken);

		getRedirectStrategy().sendRedirect(request, response, uri);
	}

	/*private URI createURI(String accessToken, String refreshToken) {
		MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
		queryParams.add(ACCESS_TOKEN, accessToken);
		queryParams.add(REFRESH_TOKEN, refreshToken);

		return UriComponentsBuilder
			.newInstance()
			.scheme("http")
			.host("localhost:8080")
			.path("/home")
			.queryParams(queryParams)
			.build()
			.toUri();

		// .newInstance()
		// .scheme("http")
		// .host("http://localhost:3000/oauth")    // 프론트 url 로 변경
		// .queryParams(queryParams)
		// .build()
		// .toUri();
	}*/
}
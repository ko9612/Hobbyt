package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static com.hobbyt.util.TestUtil.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hobbyt.domain.member.dto.LoginResponse;
import com.hobbyt.domain.member.dto.request.EmailRequest;
import com.hobbyt.domain.member.service.AuthService;
import com.hobbyt.domain.member.service.MailContentBuilder;
import com.hobbyt.domain.member.service.MailService;
import com.hobbyt.global.security.dto.LoginRequest;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

@AutoConfigureMockMvc
@SpringBootTest
class AuthControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private AuthService authService;

	@MockBean
	private MailContentBuilder mailContentBuilder;

	@MockBean
	private MailService mailService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@DisplayName("메일 인증 api")
	@Test
	void mail_confirm() throws Exception {
		//given
		/*EmailRequest emailRequest = new EmailRequest(EMAIL);
		NotificationEmail notificationEmail = NotificationEmail.of(EMAIL, TITLE, CONTENT);
		given(mailContentBuilder.createAuthCodeMail(CODE, EMAIL)).willReturn(notificationEmail);*/
		EmailRequest emailRequest = new EmailRequest(EMAIL);
		given(authService.sendAuthenticationCodeEmail(any(EmailRequest.class))).willReturn(CODE);

		//when
		ResultActions actions = mockMvc.perform(
			post("/api/auth/code")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(emailRequest))
		);

		//then
		actions.andExpect(status().isCreated())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andExpect(content().string(CODE))
			.andDo(print());
	}

	@DisplayName("토큰 재발급 api")
	@Test
	void reissue() throws Exception {
		//given
		String accessToken = jwtTokenProvider.createAccessToken(EMAIL, USER_AUTHORITY.toString());
		String refreshToken = jwtTokenProvider.createRefreshToken(EMAIL);
		String reissuedAccessToken = jwtTokenProvider.createAccessToken(EMAIL, USER_AUTHORITY.toString());
		String reissuedRefreshToken = jwtTokenProvider.createRefreshToken(EMAIL);
		given(authService.reissueAccessToken(anyString(), anyString())).willReturn(reissuedAccessToken);
		given(authService.reissueRefreshToken(anyString())).willReturn(reissuedRefreshToken);
		//when
		ResultActions actions = mockMvc.perform(
			post("/api/auth/reissue")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
				.header(REFRESH_TOKEN_HEADER, refreshToken)
		);

		//then
		actions.andExpect(status().isOk())
			.andExpect(header().string(AUTH_HEADER, TOKEN_TYPE + " " + reissuedAccessToken))
			.andExpect(header().string(REFRESH_TOKEN_HEADER, reissuedRefreshToken))
			.andDo(print());
	}

	@DisplayName("로그인 api")
	@Test
	void login() throws Exception {
		String accessToken = jwtTokenProvider.createAccessToken(EMAIL, USER_AUTHORITY.toString());
		String refreshToken = jwtTokenProvider.createRefreshToken(EMAIL);
		LoginResponse loginResponse = new LoginResponse(MEMBER_ID, accessToken, refreshToken);
		LoginRequest loginRequest = new LoginRequest(EMAIL, PASSWORD);
		given(authService.login(any(LoginRequest.class))).willReturn(loginResponse);

		ResultActions actions = mockMvc.perform(post("/api/auth/login")
			.contentType(MediaType.APPLICATION_JSON)
			.content(objectMapper.writeValueAsString(loginRequest))
			.accept(MediaType.APPLICATION_JSON)
		);

		actions.andExpect(status().isOk())
			.andDo(print());
	}

	@DisplayName("로그아웃 api")
	@Test
	void logout() throws Exception {
		String accessToken = jwtTokenProvider.createAccessToken(EMAIL, USER_AUTHORITY.toString());

		ResultActions actions = mockMvc.perform(
			post("/api/auth/logout")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
		);

		actions.andExpect(status().isOk())
			.andDo(print());
	}
}
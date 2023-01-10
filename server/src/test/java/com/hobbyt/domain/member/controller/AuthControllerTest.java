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
import com.hobbyt.config.TestMemberDetailService;
import com.hobbyt.domain.member.dto.request.EmailRequest;
import com.hobbyt.domain.member.service.AuthService;
import com.hobbyt.domain.member.service.AuthenticationCode;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

@AutoConfigureMockMvc
@SpringBootTest(classes = TestMemberDetailService.class)
class AuthControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private AuthService authService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@DisplayName("메일 인증 api")
	@Test
	void mail_confirm() throws Exception {
		//given
		String code = AuthenticationCode.createCode().getCode();
		EmailRequest emailRequest = new EmailRequest(EMAIL);
		given(authService.sendAuthenticationCodeEmail(emailRequest)).willReturn(code);

		//when
		ResultActions actions = mockMvc.perform(
			post("/api/auth/code")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(emailRequest))
		);

		//then
		actions.andExpect(status().isCreated())
			.andDo(print());
	}

	@DisplayName("토큰 재발급 api")
	@Test
	void reissue() throws Exception {
		//given
		given(authService.reissueAccessToken(anyString(), anyString())).willReturn(REISSUED_ACCESS_TOKEN);
		given(authService.reissueRefreshToken(anyString())).willReturn(REISSUED_REFRESH_TOKEN);
		//when
		ResultActions actions = mockMvc.perform(
			post("/api/auth/reissue")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.header(AUTH_HEADER, TOKEN_TYPE + " " + ACCESS_TOKEN)
				.header(REFRESH_TOKEN_HEADER, REFRESH_TOKEN)
		);

		//then
		actions.andExpect(status().isOk())
			.andDo(print());
	}

	@DisplayName("로그아웃 api")
	@Test
	void logout() throws Exception {
		String accessToken = jwtTokenProvider.createAccessToken(EMAIL, USER_AUTHORITY);

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
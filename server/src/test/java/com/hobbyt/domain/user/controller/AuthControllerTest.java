package com.hobbyt.domain.user.controller;

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
import com.hobbyt.domain.user.dto.request.EmailRequest;
import com.hobbyt.domain.user.service.AuthService;
import com.hobbyt.domain.user.service.AuthenticationCode;

@AutoConfigureMockMvc
@SpringBootTest
class AuthControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private AuthService authService;

	@DisplayName("메일 인증")
	@Test
	void mail_confirm() throws Exception {
		//given
		String code = AuthenticationCode.createCode().getCode();
		EmailRequest emailRequest = new EmailRequest("test@gmail.com");
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
}
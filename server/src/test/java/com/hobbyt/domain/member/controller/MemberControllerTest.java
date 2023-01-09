package com.hobbyt.domain.member.controller;

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
import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.service.MemberService;

@AutoConfigureMockMvc
@SpringBootTest
class MemberControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private MemberService memberService;

	@DisplayName("정상 회원가입 api")
	@Test
	void signup() throws Exception {
		//given
		SignupRequest signupRequest = new SignupRequest(NICKNAME, EMAIL, PASSWORD);
		given(memberService.createUser(any(SignupRequest.class))).willReturn(1L);

		//when
		ResultActions actions = mockMvc.perform(
			post("/api/members/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(signupRequest))
		);

		//then
		actions.andExpect(status().isCreated())
			.andDo(print());
	}
}
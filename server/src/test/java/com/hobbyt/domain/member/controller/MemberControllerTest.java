package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static com.hobbyt.util.TestUtil.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hobbyt.config.TestMemberDetailService;
import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMemberRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.UpdateMemberResponse;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;

@AutoConfigureMockMvc
@SpringBootTest(classes = TestMemberDetailService.class)
class MemberControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private MemberService memberService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	private String accessToken;
	private MemberDetails memberDetails;

	@BeforeEach
	void setup() {
		accessToken = jwtTokenProvider.createAccessToken(EMAIL, USER_AUTHORITY);
		memberDetails = dummyMemberDetails(MEMBER_ID, NICKNAME, EMAIL, PASSWORD);
	}

	@DisplayName("정상 회원가입 api")
	@Test
	void signup() throws Exception {
		//given
		SignupRequest signupRequest = new SignupRequest(NICKNAME, EMAIL, PASSWORD);
		given(memberService.createUser(any(SignupRequest.class))).willReturn(MEMBER_ID);

		//when
		ResultActions actions = mockMvc.perform(
			post("/api/members/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(signupRequest))
		);

		//then
		actions.andExpect(status().isCreated())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andExpect(content().string("1"))
			.andDo(print());
	}

	@DisplayName("회원 탈퇴 api")
	@WithMockUser(username = EMAIL, password = PASSWORD)
	@Test
	void withdraw() throws Exception {
		ResultActions actions = mockMvc.perform(delete("/api/members/myPage/delete")
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON)
			.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
		);

		actions.andExpect(status().isOk())
			.andDo(print());
	}

	@DisplayName("회원정보 변경 api")
	@Test
	void update() throws Exception {
		UpdateMemberRequest request = dummyUpdateMemberRequest(NICKNAME, DESCRIPTION, PHONE_NUMBER, ZIPCODE,
			STREET, DETAIL, BANK, ACCOUNT_NUMBER);
		UpdateMemberResponse response = dummyUpdateMemberResponse(NICKNAME, DESCRIPTION, PHONE_NUMBER,
			ZIPCODE, STREET, DETAIL, BANK, ACCOUNT_NUMBER);
		given(memberService.update(any(MemberDetails.class), any(UpdateMemberRequest.class)))
			.willReturn(response);

		ResultActions actions = mockMvc.perform(patch("/api/members/myPage")
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON)
			.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
			.content(objectMapper.writeValueAsString(request))
		);

		actions.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.nickname").value(NICKNAME))
			.andExpect(jsonPath("$.description").value(DESCRIPTION))
			.andExpect(jsonPath("$.phoneNumber").value(PHONE_NUMBER))
			.andExpect(jsonPath("$.address.zipcode").value(ZIPCODE))
			.andExpect(jsonPath("$.address.street").value(STREET))
			.andExpect(jsonPath("$.address.detail").value(DETAIL))
			.andExpect(jsonPath("$.account.bank").value(BANK))
			.andExpect(jsonPath("$.account.number").value(ACCOUNT_NUMBER))
			.andDo(print());
	}

	@DisplayName("비밀번호 변경 api")
	@Test
	void updatePassword() throws Exception {
		UpdatePassword updatePassword = dummyUpdatePassword(PASSWORD, NEW_PASSWORD, NEW_PASSWORD);

		ResultActions actions = mockMvc.perform(patch("/api/members/myPage/password")
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON)
			.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
			.content(objectMapper.writeValueAsString(updatePassword))
		);

		actions.andExpect(status().isOk())
			.andDo(print());
	}
}
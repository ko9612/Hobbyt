package com.hobbyt.domain.member.controller;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static com.hobbyt.util.TestUtil.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.http.MediaType.*;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hobbyt.config.TestMemberDetailService;
import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.dto.request.UpdateMyInfoRequest;
import com.hobbyt.domain.member.dto.request.UpdatePassword;
import com.hobbyt.domain.member.dto.response.MyInfoResponse;
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
				.contentType(APPLICATION_JSON)
				.accept(APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(signupRequest))
		);

		//then
		actions.andExpect(status().isCreated())
			.andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
			.andExpect(content().string("1"))
			.andDo(print());
	}

	@DisplayName("회원 탈퇴 api")
	@WithMockUser(username = EMAIL, password = PASSWORD)
	@Test
	void withdraw() throws Exception {
		ResultActions actions = mockMvc.perform(delete("/api/members/myPage/delete")
			.contentType(APPLICATION_JSON)
			.accept(APPLICATION_JSON)
			.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
		);

		actions.andExpect(status().isOk())
			.andDo(print());
	}

	@DisplayName("회원정보 변경 api")
	@Test
	void update() throws Exception {
		UpdateMyInfoRequest updateMyInfoRequest = dummyUpdateMyInfoRequest(PHONE_NUMBER, NAME, PHONE_NUMBER, ZIPCODE,
			STREET, DETAIL, NAME, BANK, ACCOUNT_NUMBER);
		MyInfoResponse myInfoResponse = dummyMyInfoResponse(PHONE_NUMBER, NAME, PHONE_NUMBER, ZIPCODE, STREET, DETAIL,
			NAME, BANK, ACCOUNT_NUMBER);

		ResultActions actions = mockMvc.perform(patch("/api/members/myPage")
			.contentType(APPLICATION_JSON)
			.accept(APPLICATION_JSON)
			.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
			.content(objectMapper.writeValueAsString(updateMyInfoRequest))
		);

		actions.andExpect(status().isOk())
			.andDo(print());
	}

	@DisplayName("비밀번호 변경 api")
	@Test
	void updatePassword() throws Exception {
		UpdatePassword updatePassword = dummyUpdatePassword(PASSWORD, NEW_PASSWORD, NEW_PASSWORD);

		ResultActions actions = mockMvc.perform(patch("/api/members/myPage/password")
			.contentType(APPLICATION_JSON)
			.accept(APPLICATION_JSON)
			.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
			.content(objectMapper.writeValueAsString(updatePassword))
		);

		actions.andExpect(status().isOk())
			.andDo(print());
	}

	@DisplayName("내 정보 관리의 내용 조회 api")
	@Test
	void get_my_info_Details() throws Exception {
		MyInfoResponse myInfoResponse = dummyMyInfoResponse(PHONE_NUMBER, NAME, PHONE_NUMBER, ZIPCODE, STREET, DETAIL,
			NAME, BANK, ACCOUNT_NUMBER);
		given(memberService.getMyInfo(anyString())).willReturn(myInfoResponse);

		ResultActions actions = mockMvc.perform(get("/api/members/myPage/info")
			.contentType(APPLICATION_JSON)
			.accept(APPLICATION_JSON)
			.header(AUTH_HEADER, TOKEN_TYPE + " " + accessToken)
		);

		actions.andExpect(status().isOk())
			.andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
			.andExpect(jsonPath("$.phoneNumber").value(PHONE_NUMBER))
			.andExpect(jsonPath("$.recipient.address.zipcode").value(ZIPCODE))
			.andExpect(jsonPath("$.recipient.address.street").value(STREET))
			.andExpect(jsonPath("$.recipient.address.detail").value(DETAIL))
			.andExpect(jsonPath("$.recipient.name").value(NAME))
			.andExpect(jsonPath("$.recipient.phoneNumber").value(PHONE_NUMBER))
			.andExpect(jsonPath("$.account.holder").value(NAME))
			.andExpect(jsonPath("$.account.bank").value(BANK))
			.andExpect(jsonPath("$.account.number").value(ACCOUNT_NUMBER))
			.andDo(print());
	}
}
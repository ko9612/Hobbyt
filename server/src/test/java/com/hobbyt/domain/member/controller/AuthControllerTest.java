package com.hobbyt.domain.member.controller;

// @AutoConfigureMockMvc
// @SpringBootTest
class AuthControllerTest {
	/*@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private AuthService authService;

	@MockBean
	private MailTemplateBuilder mailTemplateBuilder;

	@MockBean
	private MailSender mailSender;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@DisplayName("메일 인증 api")
	@Test
	void mail_confirm() throws Exception {
		//given
		*//*EmailRequest emailRequest = new EmailRequest(EMAIL);
		NotificationEmail notificationEmail = NotificationEmail.of(EMAIL, TITLE, CONTENT);
		given(mailContentBuilder.createAuthCodeMail(CODE, EMAIL)).willReturn(notificationEmail);*//*
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
		given(authService.reissueAccessToken(anyString())).willReturn(reissuedAccessToken);
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
		LoginDto loginDto = new LoginDto(MEMBER_ID, NICKNAME, accessToken, refreshToken);
		LoginRequest loginRequest = new LoginRequest(EMAIL, PASSWORD);
		given(authService.login(any(LoginRequest.class))).willReturn(loginDto);

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
	}*/
}
package com.hobbyt.domain.member.service;

// @ExtendWith(MockitoExtension.class)
class AuthServiceTest {
	/*@Mock
	private MailSender mailSender;

	@Mock
	private MailTemplateBuilder mailTemplateBuilder;

	@Mock
	private JwtTokenProvider jwtTokenProvider;

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private RedisService redisService;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private AuthService authService;

	// TODO AuthenticationCode 의 static 메서드 처리 방법 고민
	@DisplayName("인증코드 메일 전송")
	@Test
	void sendAuthenticationCodeEmail() {
		//given
		EmailRequest emailRequest = new EmailRequest(EMAIL);
		Email email = Email.of(EMAIL, TITLE, CONTENT);
		given(mailTemplateBuilder.createAuthCodeMail(anyString(), anyString())).willReturn(email);

		//when
		authService.sendAuthenticationCodeEmail(emailRequest);

		//then
		then(mailSender).should(times(1)).sendMail(any(Email.class));
	}

	@DisplayName("access token 재발급")
	@Test
	void reissue_access_token() {
		//given
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, PASSWORD);
		given(jwtTokenProvider.parseEmail(anyString())).willReturn(EMAIL);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));
		given(jwtTokenProvider.createAccessToken(anyString(), anyString())).willReturn(REISSUED_ACCESS_TOKEN);

		//when
		String reissueAccessToken = authService.reissueAccessToken(REFRESH_TOKEN);

		Assertions.assertThat(reissueAccessToken).isEqualTo(REISSUED_ACCESS_TOKEN);

		//then
		*//*then(jwtTokenProvider).should(times(1)).parseEmail(argThat(jws -> jws.equals(REFRESH_TOKEN)));
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(ACCESS_TOKEN)));
		then(redisService).should(times(1))
			.setValue(argThat(key -> key.equals(ACCESS_TOKEN)), argThat(value -> value.equals(
				BLACK_LIST)), argThat(timeout -> timeout == TIMEOUT));
		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
		then(jwtTokenProvider).should(times(1))
			.createAccessToken(argThat(email -> email.equals(EMAIL)),
				argThat(authority -> authority == USER_AUTHORITY.toString()));*//*
	}

	@DisplayName("refresh token 재발급")
	@Test
	void reissue_refresh_token() {
		//given
		given(jwtTokenProvider.parseEmail(anyString())).willReturn(EMAIL);
		given(jwtTokenProvider.createRefreshToken(anyString())).willReturn(REISSUED_REFRESH_TOKEN);
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(TIMEOUT);

		//when
		authService.reissueRefreshToken(REFRESH_TOKEN);

		//then
		then(jwtTokenProvider).should(times(1)).parseEmail(argThat(jws -> jws.equals(REFRESH_TOKEN)));
		then(jwtTokenProvider).should(times(1)).createRefreshToken(argThat(email -> email.equals(EMAIL)));
		then(redisService).should(times(1)).setValue(argThat(key -> key.equals(EMAIL)),
			argThat(value -> value.equals(REISSUED_REFRESH_TOKEN)), argThat(timeout -> timeout == TIMEOUT));
	}

	@DisplayName("로그아웃")
	@Test
	void logout() {
		//given
		given(jwtTokenProvider.parseEmail(anyString())).willReturn(EMAIL);
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(TIMEOUT);

		//when
		authService.logout(ACCESS_TOKEN);

		//then
		then(jwtTokenProvider).should(times(1)).parseEmail(argThat(jws -> jws.equals(ACCESS_TOKEN)));
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(ACCESS_TOKEN)));
		then(redisService).should(times(1)).deleteValue(argThat(key -> key.equals(EMAIL)));
		then(redisService).should(times(1))
			.setValue(argThat(key -> key.equals(ACCESS_TOKEN)), argThat(value -> value.equals(
				BLACK_LIST)), argThat(timeout -> timeout == TIMEOUT));
	}

	@DisplayName("로그인")
	@Test
	void login() {
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, ENCODED_PASSWORD);
		given(memberRepository.findByEmailAndStatusNot(anyString(), any(MemberStatus.class))).willReturn(
			Optional.of(member));
		given(passwordEncoder.matches(anyString(), anyString())).willReturn(true);
		given(jwtTokenProvider.createAccessToken(anyString(), anyString())).willReturn(ACCESS_TOKEN);
		given(jwtTokenProvider.createRefreshToken(anyString())).willReturn(REFRESH_TOKEN);
		LoginDto loginDto = new LoginDto(MEMBER_ID, NICKNAME, ACCESS_TOKEN, REFRESH_TOKEN);
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(TIMEOUT);
		LoginRequest loginRequest = new LoginRequest(EMAIL, PASSWORD);

		LoginDto result = authService.login(loginRequest);

		then(memberRepository).should(times(1))
			.findByEmailAndStatusNot(
				argThat(email -> email.equals(EMAIL)), argThat(status -> status == MemberStatus.WITHDRAWAL));
		then(passwordEncoder).should(times(1))
			.matches(argThat(pw -> pw.equals(loginRequest.getPassword())),
				argThat(encodedPw -> encodedPw.equals(member.getPassword())));
		then(jwtTokenProvider).should(times(1))
			.createAccessToken(argThat(email -> email.equals(EMAIL)),
				argThat(authority -> authority.equals(USER_AUTHORITY.toString())));
		then(jwtTokenProvider).should(times(1)).createRefreshToken(argThat(email -> email.equals(EMAIL)));
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(REFRESH_TOKEN)));
		then(redisService).should(times(1))
			.setValue(argThat(key -> key.equals(EMAIL)), argThat(value -> value.equals(REFRESH_TOKEN)),
				argThat(timeout -> timeout == TIMEOUT));
		assertThat(result.getAccessToken()).isEqualTo(loginDto.getAccessToken());
		assertThat(result.getRefreshToken()).isEqualTo(loginDto.getRefreshToken());
	}

	@DisplayName("LoginFailException 예외: 잘못된 비밀번호 입력")
	@Test
	void login_fail_by_password() {
		LoginRequest loginRequest = new LoginRequest(EMAIL, PASSWORD);
		Member member = dummyMember(MEMBER_ID, NICKNAME, EMAIL, ENCODED_PASSWORD);
		given(memberRepository.findByEmailAndStatusNot(anyString(), any(MemberStatus.class))).willReturn(
			Optional.of(member));
		given(passwordEncoder.matches(anyString(), anyString())).willReturn(false);

		assertThatThrownBy(() -> authService.login(loginRequest))
			.isInstanceOf(BusinessLogicException.class);
	}

	@DisplayName("LoginFailException 예외: 잘못된 email 입력")
	@Test
	void login_fail_by_email() {
		LoginRequest loginRequest = new LoginRequest(EMAIL, PASSWORD);
		given(memberRepository.findByEmailAndStatusNot(anyString(), any(MemberStatus.class))).willThrow(
			BusinessLogicException.class);

		assertThatThrownBy(() -> authService.login(loginRequest))
			.isInstanceOf(BusinessLogicException.class);
	}*/
}

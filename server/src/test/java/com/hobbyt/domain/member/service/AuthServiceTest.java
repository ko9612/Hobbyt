package com.hobbyt.domain.member.service;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static com.hobbyt.util.TestUtil.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hobbyt.domain.member.dto.request.EmailRequest;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
	@Mock
	private MailService mailService;

	@Mock
	private MailContentBuilder mailContentBuilder;

	@Mock
	private JwtTokenProvider jwtTokenProvider;

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private RedisService redisService;

	@InjectMocks
	private AuthService authService;

	@DisplayName("인증코드 메일 전송")
	@Test
	void sendAuthenticationCodeEmail() {
		//given
		EmailRequest emailRequest = new EmailRequest(EMAIL);

		//when
		authService.sendAuthenticationCodeEmail(emailRequest);

		//then
		then(mailService).should(times(1)).sendMail(any(NotificationEmail.class));
		then(mailContentBuilder).should(times(1)).build(anyString(), anyMap());
	}

	@DisplayName("access token 재발급")
	@Test
	void reissue_access_token() {
		//given
		Member member = dummyMember(1L, NICKNAME, EMAIL, PASSWORD);
		given(jwtTokenProvider.parseEmail(anyString())).willReturn(EMAIL);
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(TIMEOUT);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));

		//when
		authService.reissueAccessToken(ACCESS_TOKEN, REFRESH_TOKEN);

		//then
		then(jwtTokenProvider).should(times(1)).parseEmail(argThat(jws -> jws.equals(REFRESH_TOKEN)));
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(ACCESS_TOKEN)));
		then(redisService).should(times(1))
			.setValue(argThat(key -> key.equals(ACCESS_TOKEN)), argThat(value -> value.equals(
				BLACK_LIST)), argThat(timeout -> timeout == TIMEOUT));
		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
		then(jwtTokenProvider).should(times(1))
			.createAccessToken(argThat(email -> email.equals(EMAIL)),
				argThat(authority -> authority == USER_AUTHORITY));
	}

	@DisplayName("refresh token 재발급")
	@Test
	void reissue_refresh_token() {
		//given
		Member member = dummyMember(1L, NICKNAME, EMAIL, PASSWORD);
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
		authService.logout(ACCESS_TOKEN, REFRESH_TOKEN);

		//then
		then(jwtTokenProvider).should(times(1)).parseEmail(argThat(jws -> jws.equals(REFRESH_TOKEN)));
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(ACCESS_TOKEN)));
		then(redisService).should(times(1)).deleteValue(argThat(key -> key.equals(EMAIL)));
		then(redisService).should(times(1))
			.setValue(argThat(key -> key.equals(ACCESS_TOKEN)), argThat(value -> value.equals(
				BLACK_LIST)), argThat(timeout -> timeout == TIMEOUT));
	}
}
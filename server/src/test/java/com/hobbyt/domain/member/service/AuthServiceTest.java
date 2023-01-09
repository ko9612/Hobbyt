package com.hobbyt.domain.member.service;

import static com.hobbyt.global.security.constants.AuthConstants.*;
import static com.hobbyt.util.TestUtil.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hobbyt.domain.member.dto.request.EmailRequest;
import com.hobbyt.domain.member.entity.Authority;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;
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

	private String accessToken;
	private String refreshToken;

	@BeforeEach
	void setup() {
		accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdHkiOiJST0xFX1VTRVIiLCJlbWFpbCI6InBqNTAxNkBuYXZlci5jb20iLCJzdWIiOiJwajUwMTZAbmF2ZXIuY29tIiwiaWF0IjoxNjczMDc5OTAyLCJleHAiOjE2NzMyNjE3MDJ9.2tlaHBrLJBPijNNDdUxvo77Ec2XuOQNrRNotxTUOnIQ";
		refreshToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwajUwMTZAbmF2ZXIuY29tIiwiaWF0IjoxNjczMDc5OTAyLCJleHAiOjYyMTUzNjg0NzAyfQ.NtCbbucwL4HXotVH3ZxPuirBphSmtKeS4BEgfcGkYoQ";
	}

	@DisplayName("인증코드 메일 전송")
	@Test
	void sendAuthenticationCodeEmail() {
		//given
		EmailRequest emailRequest = new EmailRequest("test@gmail.com");

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
		Member member = createMember();
		Long expiration = 1000L;
		given(jwtTokenProvider.parseEmail(anyString())).willReturn(member.getEmail());
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(expiration);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));

		//when
		authService.reissueAccessToken(accessToken, refreshToken);

		//then
		then(jwtTokenProvider).should().parseEmail(argThat(jws -> jws.equals(refreshToken)));
		then(jwtTokenProvider).should().calculateExpiration(argThat(jws -> jws.equals(accessToken)));
		then(redisService).should().setValue(argThat(key -> key.equals(accessToken)), argThat(value -> value.equals(
			BLACK_LIST)), argThat(timeout -> timeout == expiration));
		then(memberRepository).should().findByEmail(argThat(email -> email.equals(member.getEmail())));
		then(jwtTokenProvider).should()
			.createAccessToken(argThat(email -> email.equals(member.getEmail())),
				argThat(authority -> authority == Authority.ROLE_USER));
	}

	@DisplayName("refresh token 재발급")
	@Test
	void reissue_refresh_token() {
		//given
		Member member = createMember();
		Long expiration = 1000L;
		String reissuedRefreshToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwajUwMTZAbmF2ZXIuY29tIiwiaWF0IjoxNjczMDc5OTAyLCJleHAiOjYyMTUzNjg0NzAyfQ.NtCbbucwL4HXotVH3ZxPuirBphSmtKeS4BEgfcQ";
		given(jwtTokenProvider.parseEmail(anyString())).willReturn(member.getEmail());
		given(jwtTokenProvider.createRefreshToken(anyString())).willReturn(reissuedRefreshToken);
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(expiration);

		//when
		authService.reissueRefreshToken(refreshToken);

		//then
		then(jwtTokenProvider).should().parseEmail(argThat(jws -> jws.equals(refreshToken)));
		then(jwtTokenProvider).should().createRefreshToken(argThat(email -> email.equals(member.getEmail())));
		then(redisService).should().setValue(argThat(key -> key.equals(member.getEmail())),
			argThat(value -> value.equals(reissuedRefreshToken)), argThat(timeout -> timeout == expiration));
	}

	private Member createMember() {
		return Member.builder().id(1L).nickname("test").email("test@gmail.com").password("1234").build();
	}

	@DisplayName("로그아웃")
	@Test
	void logout() {
		//given
		String email = "user1@gmail.com";
		Long expiration = 1000L;
		given(jwtTokenProvider.parseEmail(anyString())).willReturn(email);
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(expiration);

		//when
		authService.logout(accessToken, refreshToken);

		//then
		then(jwtTokenProvider).should(times(1)).parseEmail(argThat(jws -> jws.equals(refreshToken)));
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(accessToken)));
		then(redisService).should(times(1)).deleteValue(argThat(key -> key.equals(email)));
		then(redisService).should().setValue(argThat(key -> key.equals(accessToken)), argThat(value -> value.equals(
			BLACK_LIST)), argThat(timeout -> timeout == expiration));
	}

	@DisplayName("회원 탈퇴")
	@Test
	void withdraw() {
		Member member = createMember();
		given(jwtTokenProvider.calculateExpiration(anyString())).willReturn(TIMEOUT);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(member));

		authService.withdraw(ACCESS_TOKEN, EMAIL);

		assertThat(member.getStatus()).isEqualTo(MemberStatus.WITHDRAWAL);
		then(jwtTokenProvider).should(times(1)).calculateExpiration(argThat(jws -> jws.equals(ACCESS_TOKEN)));
		then(redisService).should(times(1)).deleteValue(argThat(key -> key.equals(EMAIL)));
		then(redisService).should(times(1))
			.setValue(argThat(key -> key.equals(ACCESS_TOKEN)), argThat(value -> value.equals(BLACK_LIST)),
				argThat(timeout -> timeout == TIMEOUT));
		then(memberRepository).should(times(1)).findByEmail(argThat(email -> email.equals(EMAIL)));
	}
}
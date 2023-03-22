package com.hobbyt.domain.member.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;
import static com.hobbyt.global.security.constants.AuthConstants.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.dto.LoginDto;
import com.hobbyt.domain.member.dto.response.LoginInfo;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.MemberStatus;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.error.exception.BusinessLogicException;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.dto.LoginRequest;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final RedisService redisService;
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;

	public String reissueAccessToken(final String refreshToken) {
		String email = jwtTokenProvider.parseEmail(refreshToken);

		Member member = findMemberByEmail(email);
		return jwtTokenProvider.createAccessToken(member.getEmail(), member.getAuthority().toString());
	}

	private Member findMemberByEmail(final String email) {
		return memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
	}

	public String reissueRefreshToken(final String refreshToken) {
		String email = jwtTokenProvider.parseEmail(refreshToken);
		String reissuedRefreshToken = jwtTokenProvider.createRefreshToken(email);

		redisService.setValue(email, reissuedRefreshToken,
			jwtTokenProvider.calculateExpiration(reissuedRefreshToken));

		return reissuedRefreshToken;
	}

	public void logout(final String accessToken) {
		String email = jwtTokenProvider.parseEmail(accessToken);
		Long expiration = jwtTokenProvider.calculateExpiration(accessToken);

		redisService.deleteValue(email);
		redisService.setValue(accessToken, BLACK_LIST, expiration);
	}

	public LoginDto login(LoginRequest loginRequest) {
		Member member = findMemberByEmailAndNotWithdrawal(loginRequest.getEmail());
		checkPassword(loginRequest.getPassword(), member.getPassword());

		String accessToken = jwtTokenProvider.createAccessToken(member.getEmail(), member.getAuthority().toString());
		String refreshToken = jwtTokenProvider.createRefreshToken(member.getEmail());

		redisService.setValue(member.getEmail(), refreshToken,
			jwtTokenProvider.calculateExpiration(refreshToken));

		return new LoginDto(member.getId(), member.getNickname(), accessToken, refreshToken);
	}

	private void checkPassword(String requestPassword, String password) {
		if (!passwordEncoder.matches(requestPassword, password)) {
			throw new BusinessLogicException(AUTH_INVALID_PASSWORD);
		}
	}

	private Member findMemberByEmailAndNotWithdrawal(String email) {

		return memberRepository.findByEmailAndStatusNot(email, MemberStatus.WITHDRAWAL)
			.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
	}

	public LoginInfo getLoginInfo(String email) {
		Member member = memberService.findMemberByEmail(email);
		return new LoginInfo(member.getId(), member.getNickname(), member.getEmail());
	}
}

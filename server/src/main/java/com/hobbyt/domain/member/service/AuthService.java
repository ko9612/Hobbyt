package com.hobbyt.domain.member.service;

import static com.hobbyt.global.security.constants.AuthConstants.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.dto.request.EmailRequest;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.error.exception.MemberNotExistException;
import com.hobbyt.global.redis.RedisService;
import com.hobbyt.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
	private static final String AUTH_CODE_MAIL_TITLE = "Hobbyt 인증 코드";
	private static final String CODE_KEY = "code";
	private static final String AUTH_CODE_TEMPLATE = "authCodeMail";

	private final MailService mailService;
	private final MailContentBuilder mailContentBuilder;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final RedisService redisService;

	public String sendAuthenticationCodeEmail(final EmailRequest emailRequest) {
		String code = AuthenticationCode.createCode().getCode();
		String message = createAuthenticationCodeEmailContent(code);
		NotificationEmail notificationEmail =
			NotificationEmail.of(emailRequest.getEmail(), AUTH_CODE_MAIL_TITLE, message);
		log.info("AuthService Thread: " + Thread.currentThread().getName());
		mailService.sendMail(notificationEmail);

		return code;
	}

	private String createAuthenticationCodeEmailContent(final String code) {
		Map<String, String> contents = new HashMap<>();
		contents.put(CODE_KEY, code);
		return mailContentBuilder.build(AUTH_CODE_TEMPLATE, contents);
	}

	public String reissueAccessToken(final String accessToken, final String refreshToken) {
		String email = jwtTokenProvider.parseEmail(refreshToken);
		Long expiration = jwtTokenProvider.calculateExpiration(accessToken);

		redisService.setValue(accessToken, BLACK_LIST, expiration);

		Member member = findMemberByEmail(email);
		return jwtTokenProvider.createAccessToken(member.getEmail(), member.getAuthority());
	}

	private Member findMemberByEmail(final String email) {
		return memberRepository.findByEmail(email).orElseThrow(MemberNotExistException::new);
	}

	public String reissueRefreshToken(final String refreshToken) {
		String email = jwtTokenProvider.parseEmail(refreshToken);
		String reissuedRefreshToken = jwtTokenProvider.createRefreshToken(email);

		redisService.setValue(email, reissuedRefreshToken,
			jwtTokenProvider.calculateExpiration(reissuedRefreshToken));

		return reissuedRefreshToken;
	}
}

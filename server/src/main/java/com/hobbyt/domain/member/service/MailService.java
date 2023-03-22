package com.hobbyt.domain.member.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {
	private static final String AUTH_CODE_MAIL_TITLE = "Hobbyt 인증 코드";
	private static final String CODE_KEY = "code";
	private static final String AUTH_CODE_TEMPLATE = "authCodeMail";

	private final MailerSender mailerSender;
	private final HtmlTemplate htmlTemplate;

	public String sendAuthenticationCodeEmail(final String email) {
		AuthenticationCode authenticationCode = AuthenticationCode.createCode();
		Map<String, Object> contents = fillAuthCodeMailContents(authenticationCode.getCode());
		String message = htmlTemplate.build(AUTH_CODE_TEMPLATE, contents);
		Email authCodeEmail = Email.of(email, AUTH_CODE_MAIL_TITLE, message);

		log.info("AuthService Thread: " + Thread.currentThread().getName());
		mailerSender.sendMail(authCodeEmail);

		return authenticationCode.getCode();
	}

	private Map<String, Object> fillAuthCodeMailContents(final String code) {
		Map<String, Object> contents = new HashMap<>();
		contents.put(CODE_KEY, code);
		return contents;
	}
}

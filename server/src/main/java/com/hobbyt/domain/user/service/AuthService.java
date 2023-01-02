package com.hobbyt.domain.user.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
	private final String AUTH_CODE_MAIL_TITLE = "Hobbyt 인증 코드";
	private final String CODE_KEY = "code";
	private final String AUTH_CODE_TEMPLATE = "authCodeMail";

	private final MailService mailService;
	private final MailContentBuilder mailContentBuilder;

	public String sendAuthenticationCodeEmail(final String receiver) {
		Map<String, String> contents = new HashMap<>();
		String code = new AuthenticationCode().getCode();
		contents.put(CODE_KEY, code);
		String message = mailContentBuilder.build(AUTH_CODE_TEMPLATE, contents);
		NotificationEmail notificationEmail = new NotificationEmail(receiver, AUTH_CODE_MAIL_TITLE, message);

		mailService.sendMail(notificationEmail);

		return code;
	}
}

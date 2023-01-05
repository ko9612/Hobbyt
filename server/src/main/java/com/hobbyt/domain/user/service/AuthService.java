package com.hobbyt.domain.user.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.user.dto.request.EmailRequest;

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
}

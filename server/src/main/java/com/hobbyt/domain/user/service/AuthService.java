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
@Transactional
public class AuthService {
	private static final String AUTH_CODE_MAIL_TITLE = "Hobbyt 인증 코드";
	private static final String CODE_KEY = "code";
	private static final String AUTH_CODE_TEMPLATE = "authCodeMail";

	private final MailService mailService;
	private final MailContentBuilder mailContentBuilder;

	public String sendAuthenticationCodeEmail(final EmailRequest emailRequest) {
		Map<String, String> contents = new HashMap<>();
		String code = new AuthenticationCode().getCode();
		contents.put(CODE_KEY, code);
		String message = mailContentBuilder.build(AUTH_CODE_TEMPLATE, contents);
		NotificationEmail notificationEmail = new NotificationEmail(emailRequest.getEmail(), AUTH_CODE_MAIL_TITLE,
			message);
		log.info("AuthService: " + Thread.currentThread().getName());
		mailService.sendMail(notificationEmail);

		return code;
	}
}

package com.hobbyt.domain.member.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailContentBuilder {
	private static final String AUTH_CODE_MAIL_TITLE = "Hobbyt 인증 코드";
	private static final String CODE_KEY = "code";
	private static final String AUTH_CODE_TEMPLATE = "authCodeMail";

	// TemplateEngine을 이용할 경우 @Mock 사용시 NPE 발생
	private final ITemplateEngine templateEngine;

	private String build(final String template, final Map<String, String> contents) {
		Context context = new Context();

		for (String key : contents.keySet()) {
			context.setVariable(key, contents.get(key));
		}

		return templateEngine.process(template, context);
	}

	public NotificationEmail createAuthCodeMail(String code, String email) {
		Map<String, String> contents = new HashMap<>();
		contents.put(CODE_KEY, code);
		String message = build(AUTH_CODE_TEMPLATE, contents);

		return NotificationEmail.of(email, AUTH_CODE_MAIL_TITLE, message);
	}
}

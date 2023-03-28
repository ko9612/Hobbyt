package com.hobbyt.domain.member.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MailService {
	private static final String AUTH_CODE_MAIL_TITLE = "Hobbyt 인증 코드";
	private static final String CODE_KEY = "code";
	private static final String AUTH_CODE_TEMPLATE = "authCodeMail";

	private final MailerSender mailerSender;
	private final HtmlTemplate htmlTemplate;
	private final CodeGenerator codeGenerator;

	@Autowired
	public MailService(MailerSender mailerSender, HtmlTemplate htmlTemplate) {
		this(mailerSender, htmlTemplate, new AuthenticationCodeGenerator());
	}

	public MailService(MailerSender mailerSender, HtmlTemplate htmlTemplate, CodeGenerator codeGenerator) {
		this.mailerSender = mailerSender;
		this.htmlTemplate = htmlTemplate;
		this.codeGenerator = codeGenerator;
	}

	public String sendAuthenticationCodeEmail(final String email) {
		String code = codeGenerator.generate();
		Map<String, Object> contents = fillAuthCodeMailContents(code);
		String message = htmlTemplate.build(AUTH_CODE_TEMPLATE, contents);
		Email authCodeEmail = Email.of(email, AUTH_CODE_MAIL_TITLE, message);

		mailerSender.sendMail(authCodeEmail);

		return code;
	}

	private Map<String, Object> fillAuthCodeMailContents(final String code) {
		Map<String, Object> contents = new HashMap<>();
		contents.put(CODE_KEY, code);
		return contents;
	}
}

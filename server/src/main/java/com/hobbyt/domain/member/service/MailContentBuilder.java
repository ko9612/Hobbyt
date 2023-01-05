package com.hobbyt.domain.member.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailContentBuilder {
	// TemplateEngine을 이용할 경우 @Mock 사용시 NPE 발생
	private final ITemplateEngine templateEngine;

	public String build(final String template, final Map<String, String> contents) {
		Context context = new Context();

		for (String key : contents.keySet()) {
			context.setVariable(key, contents.get(key));
		}

		return templateEngine.process(template, context);
	}
}

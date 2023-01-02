package com.hobbyt.domain.user.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailContentBuilder {
	private final TemplateEngine templateEngine;

	public String build(final String template, final Map<String, String> contents) {
		Context context = new Context();

		for (String key : contents.keySet()) {
			context.setVariable(key, contents.get(key));
		}

		return templateEngine.process(template, context);
	}
}

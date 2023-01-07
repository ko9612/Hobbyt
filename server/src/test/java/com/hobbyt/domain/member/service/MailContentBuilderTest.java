package com.hobbyt.domain.member.service;

import static org.mockito.BDDMockito.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

@ExtendWith(MockitoExtension.class)
class MailContentBuilderTest {
	@Mock
	private ITemplateEngine templateEngine;

	@InjectMocks
	private MailContentBuilder mailContentBuilder;

	@DisplayName("메일 템플릿 채우기")
	@Test
	public void mail_content_build() {
		//given
		String template = "test template";
		Map<String, String> contents = new HashMap<>();

		//when
		mailContentBuilder.build(template, contents);

		//then
		then(templateEngine).should(times(1)).process(anyString(), any(Context.class));
	}
}
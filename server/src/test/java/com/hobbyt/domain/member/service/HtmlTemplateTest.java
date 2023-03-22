package com.hobbyt.domain.member.service;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.thymeleaf.spring5.SpringTemplateEngine;

class HtmlTemplateTest {

	static class MockTemplateEngine extends SpringTemplateEngine {

	}

	@DisplayName("html 템플릿 내용 채우기")
	@Test
	void test() {
		/*StringTemplateResolver templateResolver = new StringTemplateResolver();
		templateResolver.setOrder(1);
		templateResolver.setTemplateMode(TemplateMode.TEXT);*/

		Map<String, Object> contents = new HashMap<>();
		contents.put("code", "1234");

	}
}
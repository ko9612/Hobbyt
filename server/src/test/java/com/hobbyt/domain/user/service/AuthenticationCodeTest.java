package com.hobbyt.domain.user.service;

import static org.assertj.core.api.Assertions.*;

import java.util.regex.Pattern;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AuthenticationCodeTest {
	private static final String CODE_PATTERN = "[0-9a-zA-Z]{8}";    // 0-9 or a-z or A-Z 로 이루어진 8자리

	private AuthenticationCode authenticationCode;

	@BeforeEach
	void setup() {
		authenticationCode = AuthenticationCode.createCode();
	}

	@DisplayName("정상 인증코드 길이")
	@Test
	void validateByLength() {
		assertThat(authenticationCode.getCode().length())
			.isEqualTo(8);
	}

	@DisplayName("정상 인증코드 구성")
	@Test
	void validateByPattern() {
		boolean result = Pattern.matches(CODE_PATTERN, authenticationCode.getCode());

		assertThat(result).isTrue();
	}
}
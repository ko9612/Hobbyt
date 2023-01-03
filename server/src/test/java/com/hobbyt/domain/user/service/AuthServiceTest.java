package com.hobbyt.domain.user.service;

import static org.assertj.core.api.Assertions.*;

import java.util.regex.Pattern;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hobbyt.domain.user.dto.request.EmailRequest;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
	private static final String CODE_PATTERN = "[0-9a-zA-Z]{8}";    // 0-9 or a-z or A-Z 로 이루어진 8자리

	@Mock
	private MailService mailService;

	@Mock
	private MailContentBuilder contentBuilder;

	@InjectMocks
	private AuthService authService;

	@DisplayName("인증코드 메일 전송")
	@Test
	void sendAuthenticationCodeEmail() {
		//given
		EmailRequest emailRequest = new EmailRequest("test@gmail.com");

		//when
		String code = authService.sendAuthenticationCodeEmail(emailRequest);

		//then
		assertThat(code.length()).isEqualTo(8);
		assertThat(Pattern.matches(CODE_PATTERN, code)).isTrue();
	}
}
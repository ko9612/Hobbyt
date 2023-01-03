package com.hobbyt.domain.user.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hobbyt.domain.user.dto.request.EmailRequest;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
	@Mock
	private MailService mailService;

	@Mock
	private MailContentBuilder mailContentBuilder;

	@InjectMocks
	private AuthService authService;

	@DisplayName("인증코드 메일 전송")
	@Test
	void sendAuthenticationCodeEmail() {
		//given
		String code = AuthenticationCode.createCode().getCode();
		EmailRequest emailRequest = new EmailRequest("test@gmail.com");

		//when
		String result = authService.sendAuthenticationCodeEmail(emailRequest);

		//then
		BDDMockito.then(mailService).should().sendMail(BDDMockito.any(NotificationEmail.class));
		BDDMockito.then(mailContentBuilder).should().build(BDDMockito.anyString(), BDDMockito.anyMap());
	}
}
package com.hobbyt.domain.member.service;

import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hobbyt.domain.member.dto.request.EmailRequest;

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
		EmailRequest emailRequest = new EmailRequest("test@gmail.com");

		//when
		authService.sendAuthenticationCodeEmail(emailRequest);

		//then
		then(mailService).should(times(1)).sendMail(any(NotificationEmail.class));
		then(mailContentBuilder).should(times(1)).build(anyString(), anyMap());
	}
}
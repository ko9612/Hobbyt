package com.hobbyt.domain.member.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;

import com.hobbyt.global.exception.BusinessLogicException;

@ExtendWith(MockitoExtension.class)
class MailServiceTest {
	@Mock
	private JavaMailSender mailSender;

	@InjectMocks
	private MailService mailService;

	private NotificationEmail notificationEmail;

	@BeforeEach
	void setup() {
		notificationEmail = NotificationEmail.of("test@google.com", "테스트 메일", "테스트 메일");
	}

	@DisplayName("메일 전송")
	@Test
	void sendMail() {
		//given
		//when
		mailService.sendMail(notificationEmail);

		//then
		then(mailSender).should(times(1)).send(any(MimeMessagePreparator.class));
	}

	@DisplayName("MailException 예외: 메일 전송 실패")
	@Test
	void sendMailException() {
		//given
		// MailException.class의 경우 예외 발생
		willThrow(new MailSendException("Test message"))
			.given(mailSender)
			.send(any(MimeMessagePreparator.class));

		//then
		assertThatThrownBy(() -> mailService.sendMail(notificationEmail))
			.isInstanceOf(BusinessLogicException.class);
		then(mailSender).should(times(1)).send(any(MimeMessagePreparator.class));
	}
}

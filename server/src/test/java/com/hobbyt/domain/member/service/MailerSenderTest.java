package com.hobbyt.domain.member.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;

import com.hobbyt.global.error.exception.BusinessLogicException;

@ExtendWith(MockitoExtension.class)
class MailerSenderTest {

	@Mock
	private JavaMailSender javaMailSender;

	@InjectMocks
	private MailerSender mailerSender;

	@DisplayName("메일 전송 실패")
	@Test
	void send_mail_exception() {
		Email email = Email.of("reciever@gmail.com", "subject", "content");
		willThrow(new MailSendException("fail send mail")).given(javaMailSender).send(any(MimeMessagePreparator.class));

		//then
		assertThatThrownBy(() -> mailerSender.sendMail(email))
			.isInstanceOf(BusinessLogicException.class).hasMessage("FAILED_TO_SEND_MAIL");
	}
}
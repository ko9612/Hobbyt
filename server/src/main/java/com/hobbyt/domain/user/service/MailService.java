package com.hobbyt.domain.user.service;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {
	private final JavaMailSender mailSender;

	//@Async
	public void sendMail(final NotificationEmail notificationEmail) {
		MimeMessagePreparator messagePreparator = toMimeMessagePreparator(notificationEmail);

		try {
			mailSender.send(messagePreparator);
		} catch (MailException e) {
			// log.error("인증메일 전송에러", e.getStackTrace());
			throw new IllegalArgumentException();
		}
	}

	private MimeMessagePreparator toMimeMessagePreparator(NotificationEmail notificationEmail) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

			messageHelper.setTo(notificationEmail.getReceiver());
			messageHelper.setSubject(notificationEmail.getSubject());
			messageHelper.setText(notificationEmail.getContent(), true);
		};

		return messagePreparator;
	}
}

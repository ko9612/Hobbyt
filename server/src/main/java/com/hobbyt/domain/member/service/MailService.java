package com.hobbyt.domain.member.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {
	private static final String ENCODING = "UTF-8";

	private final JavaMailSender mailSender;

	@Async
	public void sendMail(final NotificationEmail notificationEmail) {
		MimeMessagePreparator messagePreparator = toMimeMessagePreparator(notificationEmail);

		try {
			log.info("MailService Thread: " + Thread.currentThread().getName());
			mailSender.send(messagePreparator);
		} catch (MailException e) {
			throw new BusinessLogicException(MAIL_SEND_FAILED);
		}
	}

	private MimeMessagePreparator toMimeMessagePreparator(NotificationEmail notificationEmail) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, ENCODING);

			messageHelper.setTo(notificationEmail.getReceiver());
			messageHelper.setSubject(notificationEmail.getSubject());
			messageHelper.setText(notificationEmail.getContent(), true);
		};

		return messagePreparator;
	}
}

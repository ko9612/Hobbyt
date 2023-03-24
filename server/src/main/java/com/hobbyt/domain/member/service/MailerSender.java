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
public class MailerSender {
	private static final String ENCODING = "UTF-8";
	private final JavaMailSender mailSender;

	@Async
	public void sendMail(final Email email) {
		MimeMessagePreparator messagePreparator = toMimeMessagePreparator(email);

		try {
			mailSender.send(messagePreparator);
		} catch (MailException e) {
			log.error("fail send mail");
			throw new BusinessLogicException(MAIL_SEND_FAILED);
		}
		log.info("success send mail");
	}

	private MimeMessagePreparator toMimeMessagePreparator(Email email) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, ENCODING);

			messageHelper.setTo(email.getReceiver());
			messageHelper.setSubject(email.getSubject());
			messageHelper.setText(email.getContent(), true);
		};

		return messagePreparator;
	}
}

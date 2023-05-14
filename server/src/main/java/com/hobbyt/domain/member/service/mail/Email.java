package com.hobbyt.domain.member.service.mail;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Email {
	private String receiver;
	private String subject;
	private String content;

	public static Email of(String receiver, String subject, String content) {
		return new Email(receiver, subject, content);
	}
}

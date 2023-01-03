package com.hobbyt.domain.user.service;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class NotificationEmail {
	private String receiver;
	private String subject;
	private String content;

	public static NotificationEmail of(String receiver, String subject, String content) {
		return new NotificationEmail(receiver, subject, content);
	}
}

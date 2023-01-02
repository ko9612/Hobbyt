package com.hobbyt.domain.user.service;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationEmail {
	private String receiver;
	private String subject;
	private String content;
}

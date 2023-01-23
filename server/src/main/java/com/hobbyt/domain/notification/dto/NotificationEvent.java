package com.hobbyt.domain.notification.dto;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.notification.entity.NotificationType;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationEvent {
	private Member receiver;
	private String sender;
	private Long articleId;
	private String title;
	private NotificationType type;
}

package com.hobbyt.domain.notification.dto;

import java.util.List;

import com.hobbyt.domain.notification.entity.Notification;
import com.hobbyt.domain.notification.entity.NotificationType;

import lombok.Getter;

public class AlarmResponse {
	private Boolean hasNext;
	private List<Alarm> alarms;

	@Getter
	public static class Alarm {
		private Long notificationId;
		private Long receiverId;
		private String sender;
		private Long articleId;
		private String title;
		private NotificationType type;

		public Alarm(Notification notification) {
			this.notificationId = notification.getId();
			this.receiverId = notification.getReceiver().getId();
			this.sender = notification.getSender();
			this.articleId = notification.getArticleId();
			this.title = notification.getTitle();
			this.type = notification.getType();
		}
	}
}

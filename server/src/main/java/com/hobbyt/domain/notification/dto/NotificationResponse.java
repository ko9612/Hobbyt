package com.hobbyt.domain.notification.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.hobbyt.domain.notification.entity.Notification;
import com.hobbyt.domain.notification.entity.NotificationType;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class NotificationResponse {
	private Boolean hasNext;
	private List<Alarm> alarms;

	public NotificationResponse(Boolean hasNext, List<Alarm> alarms) {
		this.hasNext = hasNext;
		this.alarms = alarms;
	}

	@Getter
	@NoArgsConstructor
	public static class Alarm {
		private Long notificationId;
		private Long receiverId;
		private String sender;
		private Long redirectId;
		private String title;
		private NotificationType type;
		private LocalDateTime createdAt;

		public static Alarm from(Notification notification) {
			return new Alarm(notification);
		}

		private Alarm(Notification notification) {
			this.notificationId = notification.getId();
			this.receiverId = notification.getReceiver().getId();
			this.sender = notification.getSender();
			this.redirectId = notification.getRedirectId();
			this.title = notification.getTitle();
			this.type = notification.getType();
			this.createdAt = notification.getCreatedAt();
		}
	}
}

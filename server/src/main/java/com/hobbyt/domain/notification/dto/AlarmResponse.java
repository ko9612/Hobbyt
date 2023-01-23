package com.hobbyt.domain.notification.dto;

import java.util.List;

import com.hobbyt.domain.notification.entity.NotificationType;

public class AlarmResponse {
	private Boolean hasNext;
	private List<Alarm> alrams;

	public static class Alarm {
		private Long notificationId;
		private Long receiverId;
		private String sender;
		private Long articleId;
		private String title;
		private NotificationType type;
	}
}

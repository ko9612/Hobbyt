package com.hobbyt.domain.notification.service;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.hobbyt.domain.notification.controller.AlarmHandler;
import com.hobbyt.domain.notification.dto.NotificationEvent;
import com.hobbyt.domain.notification.dto.NotificationResponse;
import com.hobbyt.domain.notification.entity.Notification;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationEventHandler {
	private final NotificationService notificationService;
	private final AlarmHandler alarmHandler;

	@EventListener(NotificationEvent.class)
	public void Alarm(NotificationEvent event) {
		Notification notification = Notification.from(event);
		notificationService.create(notification);
		alarmHandler.pushAlarm(NotificationResponse.Alarm.from(notification));
	}
}

package com.hobbyt.domain.notification.service;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.hobbyt.domain.notification.dto.NotificationEvent;
import com.hobbyt.domain.notification.entity.Notification;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationEventHandler {
	private final NotificationService notificationService;
	private final SseService sseService;

	@Async
	@EventListener
	public void Alarm(NotificationEvent event) {
		Notification notification = Notification.from(event);
		notificationService.create(notification);
		sseService.send(event.getReceiver().getId(), notification);
	}

}

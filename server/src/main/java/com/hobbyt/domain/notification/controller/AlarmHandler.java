package com.hobbyt.domain.notification.controller;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.hobbyt.domain.notification.dto.NotificationResponse;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AlarmHandler {
	private final SimpMessageSendingOperations messagingTemplate;

	public void pushAlarm(NotificationResponse.Alarm alarm) {
		messagingTemplate.convertAndSend("/alarm/" + alarm.getReceiverId(), alarm);
	}
}

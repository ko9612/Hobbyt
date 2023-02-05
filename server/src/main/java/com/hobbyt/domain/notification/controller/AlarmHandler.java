package com.hobbyt.domain.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AlarmHandler {
	private final SimpMessageSendingOperations messagingTemplate;

	@SendTo("/alarm/{memberId}")
	public ResponseEntity<?> pushAlarm(@DestinationVariable Long memberId) {
		return ResponseEntity.ok("ok");
	}
}

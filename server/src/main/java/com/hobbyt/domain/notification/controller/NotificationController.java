package com.hobbyt.domain.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.hobbyt.domain.notification.service.SseService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {
	private final SseService sseService;

	@GetMapping("/subscribe")
	public ResponseEntity<SseEmitter> subscribe(@AuthenticationPrincipal MemberDetails member) {
		SseEmitter emitter = sseService.connect(member.getEmail());

		return ResponseEntity.ok(emitter);
	}
}

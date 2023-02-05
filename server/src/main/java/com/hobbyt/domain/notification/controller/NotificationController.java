package com.hobbyt.domain.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.notification.dto.NotificationRequest;
import com.hobbyt.domain.notification.dto.NotificationResponse;
import com.hobbyt.domain.notification.service.NotificationService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
	private final NotificationService notificationService;

	@GetMapping
	public ResponseEntity<NotificationResponse> getNotifications(
		@AuthenticationPrincipal MemberDetails loginMember, @ModelAttribute NotificationRequest request) {

		NotificationResponse response = notificationService.findUncheckedNotificationsByEmail(
			loginMember.getEmail(), request);

		return ResponseEntity.ok(response);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> checkNotification(@PathVariable Long id) {
		Long checkedId = notificationService.checkById(id);

		return ResponseEntity.ok(checkedId);
	}
}

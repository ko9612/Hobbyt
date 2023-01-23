package com.hobbyt.domain.notification.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.notification.dto.NotificationRequest;
import com.hobbyt.domain.notification.dto.NotificationResponse;
import com.hobbyt.domain.notification.entity.Notification;
import com.hobbyt.domain.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
	private final NotificationRepository notificationRepository;

	public Notification create(Notification notification) {
		return notificationRepository.save(notification);
	}

	public NotificationResponse findUncheckedNotificationsByEmail(String loginEmail, NotificationRequest request) {
		return notificationRepository.findUncheckedNotificationsByEmail(loginEmail, request);
	}

	public Long checkById(Long id) {
		Notification notification = findVerifiedOneById(id);
		notification.check();

		return notification.getId();
	}

	@Transactional(readOnly = true)
	public Notification findVerifiedOneById(Long id) {
		Optional<Notification> found = notificationRepository.findById(id);
		return found.orElseThrow(
			() -> new RuntimeException("Notification does not exist")
		);
	}
}

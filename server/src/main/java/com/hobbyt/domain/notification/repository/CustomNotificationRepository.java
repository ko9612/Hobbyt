package com.hobbyt.domain.notification.repository;

import com.hobbyt.domain.notification.dto.NotificationRequest;
import com.hobbyt.domain.notification.dto.NotificationResponse;

public interface CustomNotificationRepository {
	NotificationResponse findUncheckedNotificationsByEmail(String email, NotificationRequest request);
}

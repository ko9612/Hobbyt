package com.hobbyt.domain.notification.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class NotificationRequest {
	private long offset;
	private int limit;
}

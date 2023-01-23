package com.hobbyt.domain.notification.service;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.hobbyt.domain.notification.dto.PostCommentEvent;

@Component
public class NotificationEventHandler {

	@EventListener
	public void AlarmPostComment(PostCommentEvent event) {
		
	}

}

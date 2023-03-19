package com.hobbyt.domain.chat.controller;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.hobbyt.domain.chat.dto.ChatRoomCreateEvent;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatRoomNotiController {
	private final SimpMessageSendingOperations messagingTemplate;

	public void NotifyNewChatRoom(ChatRoomCreateEvent event) {
		messagingTemplate
			.convertAndSend("/chatrooms/notification/" + event.getMemberId(), event.getChatRoomId());
	}
}

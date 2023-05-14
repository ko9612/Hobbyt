package com.hobbyt.domain.chat.controller;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import com.hobbyt.domain.chat.dto.ChatRoomCreateEvent;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ChatRoomEventHandler {
	private final ChatRoomNotiController chatRoomNotiController;

	@TransactionalEventListener(ChatRoomCreateEvent.class)
	public void NotifyNewChatRoom(ChatRoomCreateEvent event) {
		chatRoomNotiController.NotifyNewChatRoom(event);
	}
}

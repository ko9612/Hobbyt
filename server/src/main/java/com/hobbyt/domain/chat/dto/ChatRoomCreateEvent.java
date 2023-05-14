package com.hobbyt.domain.chat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomCreateEvent {
	private Long memberId;
	private Long chatRoomId;

	public static ChatRoomCreateEvent of(Long partnerId, Long chatRoomId) {
		ChatRoomCreateEvent event = new ChatRoomCreateEvent();

		event.memberId = partnerId;
		event.chatRoomId = chatRoomId;

		return event;
	}
}

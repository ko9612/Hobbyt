package com.hobbyt.domain.chat.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomDetailResponse {
	private Long chatroomId;
	private Long partnerId;
	private String partnerNickname;
	private String profileImage;
	private List<ChatRoomMessage> messages;

	@Getter
	@NoArgsConstructor
	public static class ChatRoomMessage {
		private Long senderId;
		private String content;
		private String sentAt;
	}
}

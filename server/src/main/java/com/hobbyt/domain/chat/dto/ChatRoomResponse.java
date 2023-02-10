package com.hobbyt.domain.chat.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomResponse {
	private List<ChatRoomInfo> chatrooms;

	public static class ChatRoomInfo {
		private Long chatroomId;
		private Long partnerId;
		private String partnerNickname;
		private String profileImage;
		private String lastMessage;
		private LocalDateTime lastSentAt;
	}
}

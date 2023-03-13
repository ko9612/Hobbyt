package com.hobbyt.domain.chat.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class ChatRoomResponse {
	private List<ChatRoomInfo> chatrooms;

	@Getter
	@Setter
	@NoArgsConstructor
	public static class ChatRoomInfo {
		private Long chatRoomId;
		private Long partnerId;
		private String partnerNickname;
		private String profileImage;
		private String lastMessage;
		private LocalDateTime lastSentAt;
	}
}

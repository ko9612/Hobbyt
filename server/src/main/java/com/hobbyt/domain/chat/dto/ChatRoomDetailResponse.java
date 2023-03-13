package com.hobbyt.domain.chat.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.hobbyt.domain.chat.entity.ChatUser;

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
		private LocalDateTime sentAt;
	}

	public static ChatRoomDetailResponse of(Long chatroomId, ChatUser partner, List<ChatRoomMessage> chatRoomMessages) {
		ChatRoomDetailResponse response = new ChatRoomDetailResponse();
		response.chatroomId = chatroomId;
		response.partnerId = partner.getMember().getId();
		response.partnerNickname = partner.getMember().getNickname();
		response.profileImage = partner.getMember().getProfileImage();
		response.messages = chatRoomMessages;

		return response;
	}
}

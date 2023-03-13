package com.hobbyt.domain.chat.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class ChatRoomIdResponse {
	private List<ChatRoomIdInfo> chatroomIds;

	@Getter
	@NoArgsConstructor
	public static class ChatRoomIdInfo {
		private Long chatRoomId;
		private Long partnerId;
	}
}

package com.hobbyt.domain.chat.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomIdResponse {
	private List<ChatRoomIdInfo> chatroomIds;

	public static class ChatRoomIdInfo {
		private Long chatroomId;
		private Long partnerId;
	}
}

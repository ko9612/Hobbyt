package com.hobbyt.domain.chat.repository;

import java.util.List;
import java.util.Optional;

import com.hobbyt.domain.chat.dto.ChatRoomDetailResponse;
import com.hobbyt.domain.chat.dto.ChatRoomResponse;
import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.member.entity.Member;

public interface CustomChatRoomRepository {
	Optional<ChatRoom> findChatRoomByUserIds(Long userId1, Long userId2);

	List<ChatRoomResponse> getChatRoomsByEmail(Member member);

	ChatRoomDetailResponse getChatRoomMessages(Long chatRoomId, Member member);
}

package com.hobbyt.domain.chat.repository;

import com.hobbyt.domain.chat.entity.ChatRoom;

public interface CustomChatRoomRepository {
	ChatRoom findChatRoomByUserIds(Long userId1, Long userId2);
}

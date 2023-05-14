package com.hobbyt.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, CustomChatRoomRepository {
}

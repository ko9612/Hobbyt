package com.hobbyt.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.chat.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
}

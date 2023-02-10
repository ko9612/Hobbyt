package com.hobbyt.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.chat.entity.ChatUser;

public interface ChatUserRepository extends JpaRepository<ChatUser, Long> {
}

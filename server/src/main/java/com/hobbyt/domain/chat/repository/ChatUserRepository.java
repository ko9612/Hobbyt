package com.hobbyt.domain.chat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.entity.ChatUser;
import com.hobbyt.domain.member.entity.Member;

public interface ChatUserRepository extends JpaRepository<ChatUser, Long> {
	Optional<ChatUser> findByMemberAndChatRoom(Member member, ChatRoom chatRoom);
}

package com.hobbyt.domain.chat.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.repository.ChatMessageRepository;
import com.hobbyt.domain.chat.repository.ChatRoomRepository;
import com.hobbyt.domain.chat.repository.ChatUserRepository;
import com.hobbyt.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {
	private final MemberService memberService;
	private final ChatRoomRepository chatRoomRepository;
	private final ChatUserRepository chatUserRepository;
	private final ChatMessageRepository chatMessageRepository;

	public ChatRoom createChatRoomOrFindIfExist(String email, Long partnerId) {
		return null;
	}
}

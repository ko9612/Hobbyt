package com.hobbyt.domain.chat.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.entity.ChatMessage;
import com.hobbyt.domain.chat.entity.ChatUser;
import com.hobbyt.domain.chat.repository.ChatMessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatMessageService {
	private final ChatMessageRepository chatMessageRepository;

	public ChatMessage createChatMessage(ChatUser chatUser, String content) {
		ChatMessage chatMessage = ChatMessage.of(chatUser, content);

		return chatMessageRepository.save(chatMessage);
	}
}

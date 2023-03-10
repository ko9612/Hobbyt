package com.hobbyt.domain.chat.service;

import static com.hobbyt.global.exception.ExceptionCode.*;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.dto.ChatRoomResponse;
import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.repository.ChatMessageRepository;
import com.hobbyt.domain.chat.repository.ChatRoomRepository;
import com.hobbyt.domain.chat.repository.ChatUserRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomService {
	private final MemberService memberService;
	private final ChatRoomRepository chatRoomRepository;
	private final ChatUserRepository chatUserRepository;
	private final ChatMessageRepository chatMessageRepository;

	public ChatRoom createChatRoomOrFindIfExist(String email, Long partnerId) {
		Member member = memberService.findMemberByEmail(email);

		Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findChatRoomByUserIds(member.getId(), partnerId);

		return chatRoomOptional
			.orElseGet(this::createChatRoom);
	}

	public ChatRoomResponse getChatRoomsByEmail(String email) {
		Member member = memberService.findMemberByEmail(email);
		chatRoomRepository.getChatRoomsByEmail(member);

		return null;
	}

	public ChatRoom findByVerifiedOneById(Long id) {
		return chatRoomRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(RESOURCE_NOT_FOUND));
	}

	private ChatRoom createChatRoom() {
		return chatRoomRepository.save(new ChatRoom());
	}
}

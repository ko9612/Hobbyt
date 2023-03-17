package com.hobbyt.domain.chat.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.dto.ChatRoomDetailResponse;
import com.hobbyt.domain.chat.dto.ChatRoomIdResponse;
import com.hobbyt.domain.chat.dto.ChatRoomResponse;
import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.repository.ChatRoomRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {
	private final MemberService memberService;
	private final ChatRoomRepository chatRoomRepository;

	public ChatRoom createChatRoomOrFindIfExist(String email, Long partnerId) {
		Member member = memberService.findMemberByEmail(email);

		Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findChatRoomByUserIds(member.getId(), partnerId);
		log.error("" + chatRoomOptional.isEmpty());

		return chatRoomOptional
			.orElseGet(this::createChatRoom);
	}

	public ChatRoomResponse getChatRoomsByEmail(String email) {
		Member member = memberService.findMemberByEmail(email);

		return chatRoomRepository.getChatRooms(member);
	}

	public ChatRoomIdResponse getChatRoomIdsByEmail(String email) {
		Member member = memberService.findMemberByEmail(email);

		return chatRoomRepository.getChatRoomIds(member);
	}

	public ChatRoomDetailResponse getChatRoomMessages(Long chatRoomId, Member member) {

		return chatRoomRepository.getChatRoomMessages(chatRoomId, member);
	}

	public ChatRoom findByVerifiedOneById(Long id) {
		return chatRoomRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(RESOURCE_NOT_FOUND));
	}

	private ChatRoom createChatRoom() {
		return chatRoomRepository.save(new ChatRoom());
	}
}

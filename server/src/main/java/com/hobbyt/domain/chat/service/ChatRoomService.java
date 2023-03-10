package com.hobbyt.domain.chat.service;

import static com.hobbyt.global.exception.ExceptionCode.*;

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
import com.hobbyt.global.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomService {
	private final MemberService memberService;
	private final ChatRoomRepository chatRoomRepository;

	public ChatRoom createChatRoomOrFindIfExist(String email, Long partnerId) {
		Member member = memberService.findMemberByEmail(email);

		Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findChatRoomByUserIds(member.getId(), partnerId);

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

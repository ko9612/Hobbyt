package com.hobbyt.domain.chat.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.entity.ChatUser;
import com.hobbyt.domain.chat.repository.ChatUserRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatUserService {
	private MemberService memberService;
	private final ChatUserRepository chatUserRepository;

	public ChatUser createChatUserOrFindIfExist(Long memberId, ChatRoom chatRoom) {
		Member member = memberService.findMemberById(memberId);

		Optional<ChatUser> chatUserOptional = chatUserRepository.findByMemberAndChatRoom(member, chatRoom);

		return chatUserOptional
			.orElseGet(() -> createChatUser(member, chatRoom));
	}

	public ChatUser createChatUserOrFindIfExist(String email, ChatRoom chatRoom) {
		Member member = memberService.findMemberByEmail(email);

		Optional<ChatUser> chatUserOptional = chatUserRepository.findByMemberAndChatRoom(member, chatRoom);

		return chatUserOptional
			.orElseGet(() -> createChatUser(member, chatRoom));
	}

	public ChatUser findVerifiedOneByMemberAndChatRoom(Member member, ChatRoom chatRoom) {
		return chatUserRepository.findByMemberAndChatRoom(member, chatRoom)
			.orElseThrow(() -> new BusinessLogicException(RESOURCE_NOT_FOUND));
	}

	private ChatUser createChatUser(Member member, ChatRoom chatRoom) {
		ChatUser chatUser = ChatUser.of(member, chatRoom);

		return chatUserRepository.save(chatUser);
	}

}

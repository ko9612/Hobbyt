package com.hobbyt.domain.chat.controller;

import static com.hobbyt.global.error.exception.ExceptionCode.*;
import static com.hobbyt.global.security.constants.AuthConstants.*;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.chat.dto.ChatRoomDetailResponse;
import com.hobbyt.domain.chat.dto.ChatRoomIdResponse;
import com.hobbyt.domain.chat.dto.ChatRoomResponse;
import com.hobbyt.domain.chat.entity.ChatMessage;
import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.entity.ChatUser;
import com.hobbyt.domain.chat.service.ChatMessageService;
import com.hobbyt.domain.chat.service.ChatRoomService;
import com.hobbyt.domain.chat.service.ChatUserService;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.error.exception.BusinessLogicException;
import com.hobbyt.global.security.jwt.JwtTokenProvider;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
public class ChatRoomController {
	private final ChatRoomService chatRoomService;
	private final ChatUserService chatUserService;
	private final ChatMessageService chatMessageService;
	private final MemberService memberService;
	private final SimpMessageSendingOperations messagingTemplate;
	private final JwtTokenProvider jwtTokenProvider;

	@GetMapping
	public ResponseEntity<ChatRoomResponse> getChatRooms(@AuthenticationPrincipal MemberDetails memberDetails) {
		String email = memberDetails.getEmail();

		ChatRoomResponse response = chatRoomService.getChatRoomsByEmail(email);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/ids")
	public ResponseEntity<ChatRoomIdResponse> getChatRoomIds(@AuthenticationPrincipal MemberDetails memberDetails) {
		String email = memberDetails.getEmail();

		ChatRoomIdResponse response = chatRoomService.getChatRoomIdsByEmail(email);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{chatroomId}")
	public ResponseEntity<?> getChatroomMessages(
		@AuthenticationPrincipal MemberDetails memberDetails, @PathVariable Long chatroomId) {
		String email = memberDetails.getEmail();
		Member member = memberService.findMemberByEmail(email);

		ChatRoomDetailResponse response = chatRoomService.getChatRoomMessages(chatroomId, member);

		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Long> createChatroomOrFindIfExist(
		@AuthenticationPrincipal MemberDetails memberDetails, @RequestBody Long partnerId) {
		ChatRoom chatRoom = chatRoomService.createChatRoomOrFindIfExist(memberDetails.getEmail(), partnerId);

		ChatUser chatUser = chatUserService.createChatUserOrFindIfExist(memberDetails.getEmail(), chatRoom);
		ChatUser partner = chatUserService.createChatUserOrFindIfExist(partnerId, chatRoom);

		return ResponseEntity.ok(chatRoom.getId());
	}

	@MessageMapping("/chatrooms/{chatroomId}")
	public void sendMessage(@DestinationVariable Long chatroomId, Message<String> message) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

		String header = headerAccessor.getFirstNativeHeader(AUTH_HEADER);

		if (!StringUtils.hasText(header) || !header.startsWith(TOKEN_TYPE)) {
			throw new BusinessLogicException(UNAUTHORIZED);
		}

		String jwt = header.substring(7);
		String email = jwtTokenProvider.parseEmail(jwt);

		Member member = memberService.findMemberByEmail(email);
		ChatRoom chatRoom = chatRoomService.findByVerifiedOneById(chatroomId);
		ChatUser chatUser = chatUserService.findVerifiedOneByMemberAndChatRoom(member, chatRoom);

		ChatMessage created = chatMessageService.createChatMessage(chatUser, message.getPayload());

		messagingTemplate.convertAndSend("/chatrooms/" + chatroomId, created.getContent());
	}
}

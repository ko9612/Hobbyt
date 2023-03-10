package com.hobbyt.domain.chat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.entity.ChatUser;
import com.hobbyt.domain.chat.service.ChatRoomService;
import com.hobbyt.domain.chat.service.ChatUserService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
public class ChatRoomController {
	private final ChatRoomService chatRoomService;
	private final ChatUserService chatUserService;
	private final SimpMessageSendingOperations messagingTemplate;

	@GetMapping
	public ResponseEntity<?> getChatRooms(@AuthenticationPrincipal MemberDetails memberDetails) {

		return ResponseEntity.ok(null);
	}

	@GetMapping("/ids")
	public ResponseEntity<?> getChatRoomIds(@AuthenticationPrincipal MemberDetails memberDetails) {

		return ResponseEntity.ok(null);
	}

	@GetMapping("/{chatroomId}")
	public ResponseEntity<?> getChatroomMessages(
		@AuthenticationPrincipal MemberDetails memberDetails, @PathVariable Long chatroomId) {

		return ResponseEntity.ok(null);
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
	public void sendMessage(@DestinationVariable Long chatroomId, String message) {
		messagingTemplate.convertAndSend("/chatrooms/" + chatroomId, message);
	}
}

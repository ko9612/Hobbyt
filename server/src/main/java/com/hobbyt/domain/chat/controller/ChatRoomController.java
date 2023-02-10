package com.hobbyt.domain.chat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.chat.service.ChatService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
public class ChatRoomController {
	private final ChatService chatService;
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
	public ResponseEntity<?> createChatroomOrFindIfExist(
		@AuthenticationPrincipal MemberDetails memberDetails, @RequestBody Long partnerId) {

		return ResponseEntity.ok(null);
	}

	@MessageMapping("/chatrooms/{chatroomId}")
	@SendToUser()
	public void sendMessage(@DestinationVariable Long chatroomId, String message) {
		messagingTemplate.convertAndSend("/chatrooms/" + chatroomId, message);
	}
}

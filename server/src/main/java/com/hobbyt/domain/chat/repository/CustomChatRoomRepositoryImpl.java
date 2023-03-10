package com.hobbyt.domain.chat.repository;

import static com.hobbyt.domain.chat.entity.QChatMessage.*;
import static com.hobbyt.domain.chat.entity.QChatRoom.*;
import static com.hobbyt.domain.chat.entity.QChatUser.*;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.dto.ChatRoomDetailResponse;
import com.hobbyt.domain.chat.dto.ChatRoomIdResponse;
import com.hobbyt.domain.chat.dto.ChatRoomResponse;
import com.hobbyt.domain.chat.entity.ChatMessage;
import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.chat.entity.ChatUser;
import com.hobbyt.domain.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomChatRoomRepositoryImpl implements CustomChatRoomRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public Optional<ChatRoom> findChatRoomByUserIds(Long userId1, Long userId2) {
		List<Long> chatRoomIdsCorrespondingUserId = getChatRoomIdsCorrespondingUserId(userId1);
		List<Long> chatRoomIdsCorrespondingUserId2 = getChatRoomIdsCorrespondingUserId(userId2);

		chatRoomIdsCorrespondingUserId.retainAll(chatRoomIdsCorrespondingUserId2);

		return Optional.ofNullable(
			queryFactory
				.select(chatRoom)
				.from(chatRoom)
				.where(chatRoom.id.in(chatRoomIdsCorrespondingUserId))
				.fetchFirst());
	}

	@Override
	public ChatRoomResponse getChatRooms(Member member) {
		List<Long> chatRoomIds = getChatRoomIdsByMember(member);

		List<ChatRoomResponse.ChatRoomInfo> chatRoomInfos = queryFactory
			.select(Projections.fields(ChatRoomResponse.ChatRoomInfo.class,
				chatUser.chatRoom.id.as("chatRoomId"),
				chatUser.member.id.as("partnerId"),
				chatUser.member.nickname.as("partnerNickname"),
				chatUser.member.profileImage
			))
			.from(chatUser)
			.where(chatUser.chatRoom.id.in(chatRoomIds),
				chatUser.member.ne(member))
			.fetch();

		for (ChatRoomResponse.ChatRoomInfo chatRoomInfo : chatRoomInfos) {
			ChatMessage found = queryFactory
				.select(chatMessage)
				.from(chatMessage)
				.where(chatMessage.chatUser.chatRoom.id.eq(chatRoomInfo.getChatroomId()),
					chatMessage.chatUser.member.id.eq(chatRoomInfo.getPartnerId()))
				.orderBy(chatMessage.id.desc())
				.fetchFirst();

			chatRoomInfo.setLastMessage(found.getContent());
			chatRoomInfo.setLastSentAt(found.getCreatedAt());
		}

		return new ChatRoomResponse(chatRoomInfos);
	}

	@Override
	public ChatRoomIdResponse getChatRoomIds(Member member) {
		List<Long> chatRoomIds = getChatRoomIdsByMember(member);

		List<ChatRoomIdResponse.ChatRoomIdInfo> chatRoomIdInfos = queryFactory
			.select(Projections.fields(ChatRoomIdResponse.ChatRoomIdInfo.class,
				chatUser.chatRoom.id.as("chatRoomId"),
				chatUser.id.as("partnerId")
			))
			.from(chatUser)
			.where(chatUser.chatRoom.id.in(chatRoomIds),
				chatUser.member.ne(member))
			.fetch();

		return new ChatRoomIdResponse(chatRoomIdInfos);
	}

	@Override
	public ChatRoomDetailResponse getChatRoomMessages(Long chatRoomId, Member member) {
		List<ChatUser> chatUsers = queryFactory
			.select(chatUser)
			.from(chatUser)
			.where(chatUser.chatRoom.id.eq(chatRoomId))
			.fetch();

		List<ChatRoomDetailResponse.ChatRoomMessage> chatRoomMessages = queryFactory
			.select(Projections.fields(ChatRoomDetailResponse.ChatRoomMessage.class,
				chatMessage.chatUser.id.as("senderId"),
				chatMessage.content,
				chatMessage.createdAt.as("sentAt")
			))
			.from(chatMessage)
			.where(chatMessage.chatUser.in(chatUsers))
			.orderBy(chatMessage.id.asc())
			.fetch();

		ChatUser partner = chatUsers.stream()
			.filter(chatUser -> !chatUser.getMember().equals(member))
			.findFirst()
			.get();

		return ChatRoomDetailResponse.of(chatRoomId, partner, chatRoomMessages);
	}

	private List<Long> getChatRoomIdsCorrespondingUserId(Long userId1) {
		return queryFactory
			.select(chatUser.chatRoom.id)
			.from(chatUser)
			.where(chatUser.id.eq(userId1))
			.fetch();
	}

	private List<Long> getChatRoomIdsByMember(Member member) {
		return queryFactory
			.select(chatUser.chatRoom.id)
			.from(chatUser)
			.where(chatUser.member.eq(member))
			.fetch();
	}
}

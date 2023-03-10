package com.hobbyt.domain.chat.repository;

import static com.hobbyt.domain.chat.entity.QChatRoom.*;
import static com.hobbyt.domain.chat.entity.QChatUser.*;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.dto.ChatRoomResponse;
import com.hobbyt.domain.chat.entity.ChatRoom;
import com.hobbyt.domain.member.entity.Member;
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
	public List<ChatRoomResponse> getChatRoomsByEmail(Member member) {
		// List<Long> chatRoomIds = queryFactory
		// 	.select(chatUser.chatRoom.id)
		// 	.from(chatUser)
		// 	.where(chatUser.member.eq(member))
		// 	.fetch();
		//
		// queryFactory.select()

		return null;
	}

	private List<Long> getChatRoomIdsCorrespondingUserId(Long userId1) {
		return queryFactory
			.select(chatUser.chatRoom.id)
			.from(chatUser)
			.where(chatUser.id.eq(userId1))
			.fetch();
	}
}

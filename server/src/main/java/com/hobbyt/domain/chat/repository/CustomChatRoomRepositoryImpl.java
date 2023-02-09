package com.hobbyt.domain.chat.repository;

import static com.hobbyt.domain.chat.entity.QChatRoom.*;
import static com.hobbyt.domain.chat.entity.QChatUser.*;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.chat.entity.ChatRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomChatRoomRepositoryImpl implements CustomChatRoomRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public ChatRoom findChatRoomByUserIds(Long userId1, Long userId2) {
		queryFactory
			.select(chatRoom)
			.from(chatUser)
			.join(chatUser.chatRoom, chatRoom)
			.where()
			.fetchFirst();

		return null;
	}
}

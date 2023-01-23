package com.hobbyt.domain.notification.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.notification.entity.QNotification.*;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.notification.dto.NotificationRequest;
import com.hobbyt.domain.notification.dto.NotificationResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomNotificationRepositoryImpl implements CustomNotificationRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public NotificationResponse findUncheckedNotificationsByEmail(String email, NotificationRequest request) {
		List<NotificationResponse.Alarm> alarms = queryFactory
			.select(Projections.fields(NotificationResponse.Alarm.class,
				notification.id.as("notificationId"),
				notification.receiver.id.as("receiverId"),
				notification.sender,
				notification.articleId,
				notification.title,
				notification.type,
				notification.createdAt
			))
			.from(notification)
			.join(notification.receiver, member)
			.where(member.email.eq(email))
			.offset(request.getOffset())
			.limit(request.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(alarms, request.getLimit());

		return new NotificationResponse(hasNext, alarms);
	}

	private Boolean getHasNext(List<?> alarms, int limit) {
		if (alarms.size() > limit) {
			alarms.remove(limit);
			return true;
		}

		return false;
	}
}

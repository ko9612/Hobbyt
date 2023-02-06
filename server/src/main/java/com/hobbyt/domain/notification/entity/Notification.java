package com.hobbyt.domain.notification.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.notification.dto.NotificationEvent;
import com.hobbyt.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notification extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, updatable = false, name = "sender_nickname")
	private String sender;
	@Column(nullable = false, updatable = false)
	@Enumerated(EnumType.STRING)
	private NotificationType type;
	@Column(nullable = false)
	private Long redirectId;
	@Column(nullable = false, updatable = false, name = "article_title")
	private String title;
	@Column(nullable = false)
	private Boolean checked = false;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "receiver_id")
	private Member receiver;

	public static Notification from(NotificationEvent event) {
		return new Notification(event.getSender(), event.getType(),
			event.getRedirectId(), event.getTitle(), event.getReceiver());
	}

	public void check() {
		this.checked = true;
	}

	private Notification(String sender, NotificationType type, Long redirectId, String title, Member receiver) {
		this.sender = sender;
		this.type = type;
		this.redirectId = redirectId;
		this.title = title;
		this.receiver = receiver;
	}
}

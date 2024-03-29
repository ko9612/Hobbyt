package com.hobbyt.domain.chat.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatUser extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "chat_room_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ChatRoom chatRoom;

	public static ChatUser of(Member member, ChatRoom chatRoom) {
		ChatUser chatUser = new ChatUser();
		chatUser.member = member;
		chatUser.chatRoom = chatRoom;

		return chatUser;
	}
}

package com.hobbyt.domain.chat.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.hobbyt.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ChatMessage extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String content;
	@Column
	private String image;
	@Column(nullable = false)
	private boolean modified = false;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "chat_user_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private ChatUser chatUser;

	public static ChatMessage of(ChatUser chatUser, String content) {
		ChatMessage chatMessage = new ChatMessage();
		chatMessage.content = content;
		chatMessage.chatUser = chatUser;

		return chatMessage;
	}
}

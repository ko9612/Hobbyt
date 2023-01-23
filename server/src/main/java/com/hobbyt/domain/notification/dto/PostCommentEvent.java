package com.hobbyt.domain.notification.dto;

import com.hobbyt.domain.member.entity.Member;

import lombok.Getter;

@Getter
public class PostCommentEvent {
	private Member receiver;
	private String Sender;
	private Long postId;
	private String title;
}

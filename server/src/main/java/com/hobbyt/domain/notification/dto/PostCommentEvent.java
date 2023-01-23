package com.hobbyt.domain.notification.dto;

import com.hobbyt.domain.member.entity.Member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostCommentEvent {
	private Member receiver;
	private String sender;
	private Long postId;
	private String title;
}

package com.hobbyt.domain.main.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.Getter;
import lombok.NoArgsConstructor;

@RedisHash("Hot_Post")
@Getter
@NoArgsConstructor
public class HotPost {
	@Id
	private Long postId;
	private String title;
	private String content;
	private long viewCount;
	private long likeCount;
	private Boolean isPublic;
	private Long writerId;
	private String nickname;
	private LocalDateTime createdAt;
}

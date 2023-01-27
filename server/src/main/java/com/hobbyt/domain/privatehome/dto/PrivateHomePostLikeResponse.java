package com.hobbyt.domain.privatehome.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PrivateHomePostLikeResponse {
	private Long postLikeId;
	private Long postId;
	private String title;
	private String content;
	private String thumbnailImage;
	private long viewCount;
	private long likeCount;
	private LocalDateTime createdAt;
}

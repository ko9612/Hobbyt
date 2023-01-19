package com.hobbyt.domain.search.dto;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class SearchPostResponse {
	private Boolean hasNext;

	public static class PostCard {
		private Long id;
		private String title;
		private String content;
		private long viewCount;
		private long likeCount;
		private Boolean isPublic;
		private Long writerId;
		private String nickname;
		private LocalDateTime createdAt;
	}
}

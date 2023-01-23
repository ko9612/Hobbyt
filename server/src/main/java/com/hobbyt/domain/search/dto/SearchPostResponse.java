package com.hobbyt.domain.search.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class SearchPostResponse {
	private Boolean hasNext;
	private List<PostCard> posts;

	public SearchPostResponse(Boolean hasNext, List<PostCard> posts) {
		this.hasNext = hasNext;
		this.posts = posts;
	}

	@Getter
	@NoArgsConstructor
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

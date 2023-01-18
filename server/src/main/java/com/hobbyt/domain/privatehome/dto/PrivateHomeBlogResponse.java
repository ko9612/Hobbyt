package com.hobbyt.domain.privatehome.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class PrivateHomeBlogResponse {
	private Boolean hasNext;
	private List<PostCard> posts;

	public PrivateHomeBlogResponse(Boolean hasNext, List<PostCard> posts) {
		this.hasNext = hasNext;
		this.posts = posts;
	}

	@Getter
	@NoArgsConstructor
	public static class PostCard {
		private Long id;
		private String title;
		private String content;
		private String thumbnailImage;
		private long viewCount;
		private long likeCount;
		private Boolean isPublic;
		private LocalDateTime createdAt;
	}
}

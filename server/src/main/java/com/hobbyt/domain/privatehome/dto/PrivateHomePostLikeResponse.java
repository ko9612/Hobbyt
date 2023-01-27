package com.hobbyt.domain.privatehome.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class PrivateHomePostLikeResponse {
	private Boolean hasNext;
	private List<PostCard> cards;

	@Getter
	@NoArgsConstructor
	public static class PostCard {
		private Long postLikeId;
		private Long postId;
		private String title;
		private String content;
		private String thumbnailImage;
		private long viewCount;
		private long likeCount;
		private LocalDateTime createdAt;
	}
}
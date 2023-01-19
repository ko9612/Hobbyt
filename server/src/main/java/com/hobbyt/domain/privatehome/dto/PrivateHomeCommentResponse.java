package com.hobbyt.domain.privatehome.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class PrivateHomeCommentResponse {
	private Boolean hasNext;
	private List<CommentCard> comments;

	public PrivateHomeCommentResponse(Boolean hasNext, List<CommentCard> comments) {
		this.hasNext = hasNext;
		this.comments = comments;
	}

	@Getter
	@NoArgsConstructor
	public static class CommentCard {
		private Long id;
		private String content;
		private Long postId;
		private String postTitle;
		private LocalDateTime createdAt;
	}
}

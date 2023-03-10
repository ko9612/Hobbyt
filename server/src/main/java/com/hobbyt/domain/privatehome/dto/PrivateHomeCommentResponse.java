package com.hobbyt.domain.privatehome.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class PrivateHomeCommentResponse {
	private Boolean hasNext;
	private List<CommentCard> comments;

	@Getter
	@NoArgsConstructor
	public static class CommentCard {
		private Long id;
		private String content;
		private Long postId;
		private Long postWriterId;
		private String postTitle;
		private String thumbnailImage;
		private LocalDateTime createdAt;
	}
}

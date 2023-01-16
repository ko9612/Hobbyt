package com.hobbyt.domain.post.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostResponse {
	private Long id;
	private String title;
	private String content;
	private String thumbnailImage;
	private long viewCount;
	private long likeCount;
	private boolean isPublic;
	private LocalDateTime createdAt;
	private WriterBox writer;
	private List<CommentBox> comments;
	private List<String> tags;

	@Getter
	@AllArgsConstructor
	public static class WriterBox {
		private Long id;
		private String nickName;
		private String profileImage;
		private LocalDateTime signedUpAt;
		private int followings;
		private int followers;
	}

	@Getter
	@AllArgsConstructor
	public static class CommentBox {
		private Long writerId;
		private String nickName;
		private String profileImage;
		private LocalDateTime createdAt;
		private String content;
	}
}

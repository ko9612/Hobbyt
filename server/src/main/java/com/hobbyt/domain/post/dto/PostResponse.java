package com.hobbyt.domain.post.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostResponse {
	private String title;
	private String content;
	private long viewCount;
	private long likeCount;
	private LocalDateTime createdAt;
	private WriterBox writer;
	private List<CommentBox> comments;

	@Getter
	@AllArgsConstructor
	public static class WriterBox {
		private String nickName;
		private String profileImage;
		private LocalDateTime signedUpAt;
		private int followings;
		private int followers;
	}

	@Getter
	@AllArgsConstructor
	public static class CommentBox {
		private String nickName;
		private String profileImage;
		private LocalDateTime createdAt;
		private String content;
	}
}

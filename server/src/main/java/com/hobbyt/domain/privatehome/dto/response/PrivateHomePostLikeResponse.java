package com.hobbyt.domain.privatehome.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class PrivateHomePostLikeResponse {
	private Boolean hasNext;
	private List<PostCard> cards;

	@Getter
	@NoArgsConstructor
	public static class PostCard {
		private Long postLikeId;
		private Long id;
		private Long writerId;
		private String nickname;
		private String profileImage;
		private String title;
		private String content;
		private String thumbnailImage;
		private long viewCount;
		private long likeCount;
		private Boolean isPublic;
		private LocalDateTime createdAt;
	}
}

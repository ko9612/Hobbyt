package com.hobbyt.domain.post.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.post.entity.Post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class PostResponse {
	private Long id;
	private String title;
	private String content;
	private String thumbnailImage;
	private long viewCount;
	private long likeCount;
	private Boolean isPublic;
	private Boolean isLiked = false;
	private LocalDateTime createdAt;
	private WriterBox writer;
	private List<CommentBox> comments;
	private List<String> tags;

	public PostResponse(Post post, List<CommentBox> comments, List<String> tags) {
		this.id = post.getId();
		this.title = post.getTitle();
		this.content = post.getContent();
		this.thumbnailImage = post.getThumbnailImage();
		this.viewCount = post.getViewCount();
		this.likeCount = post.getLikeCount();
		this.isPublic = post.getIsPublic();
		this.createdAt = post.getCreatedAt();
		this.writer = new WriterBox(post.getWriter());
		this.comments = comments;
		this.tags = tags;
	}

	@Getter
	public static class WriterBox {
		private Long id;
		private String email;
		private String nickName;
		private String profileImage;
		private LocalDateTime signedUpAt;
		private int followings;
		private int followers;

		public WriterBox(Member member) {
			this.id = member.getId();
			this.email = member.getEmail();
			this.nickName = member.getNickname();
			this.profileImage = member.getProfileImage();
			this.signedUpAt = member.getCreatedAt();
			this.followings = member.getFollowingCount();
			this.followers = member.getFollowerCount();
		}
	}

	@Getter
	@NoArgsConstructor
	public static class CommentBox {
		private Long id;
		private Long writerId;
		private String nickname;
		private String profileImage;
		private LocalDateTime createdAt;
		private String content;
	}
}

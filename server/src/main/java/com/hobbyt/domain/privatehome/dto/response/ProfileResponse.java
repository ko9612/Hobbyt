package com.hobbyt.domain.privatehome.dto.response;

import java.time.LocalDateTime;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.Views;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProfileResponse {
	private String headerImage;
	private String profileImage;
	private String nickname;
	private LocalDateTime createdAt;
	private String description;
	private int followerCount;
	private int followingCount;

	private Views views;

	private Boolean isFollowing;

	@Builder
	private ProfileResponse(String headerImage, String profileImage, String nickname, LocalDateTime createdAt,
		String description, int followerCount, int followingCount, Views views) {
		this.headerImage = headerImage;
		this.profileImage = profileImage;
		this.nickname = nickname;
		this.createdAt = createdAt;
		this.description = description;
		this.followerCount = followerCount;
		this.followingCount = followingCount;
		this.views = views == null ? new Views() : views;
	}

	public static ProfileResponse of(Member member) {
		return ProfileResponse.builder()
			.headerImage(member.getHeaderImage())
			.profileImage(member.getProfileImage())
			.nickname(member.getNickname())
			.createdAt(member.getCreatedAt())
			.description(member.getDescription())
			.followerCount(member.getFollowerCount())
			.followingCount(member.getFollowingCount())
			.views(member.getViews())
			.build();
	}

	public void setIsFollowing(Boolean isFollowing) {
		this.isFollowing = isFollowing;
	}
}

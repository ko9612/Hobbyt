package com.hobbyt.domain.follow.dto;

import lombok.Getter;

@Getter
public class FollowingDto {
	private Long id;
	private String nickname;
	private String profileImage;
	private String description;
	private Boolean isFollowing;

	public FollowingDto(Long id, String nickname, String profileImage, String description) {
		this.id = id;
		this.nickname = nickname;
		this.profileImage = profileImage;
		this.description = description;
	}

	public void setIsFollowing(Boolean isFollowing) {
		this.isFollowing = isFollowing;
	}
}

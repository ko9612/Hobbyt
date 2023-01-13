package com.hobbyt.domain.member.dto.response;

import java.time.LocalDateTime;

import com.hobbyt.domain.entity.Views;
import com.hobbyt.domain.member.entity.Member;

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
	// 팔로워 수
	private int followerCount;

	// 팔로잉 수
	private int followingCount;
	private ViewsDto views;

	@Getter
	@NoArgsConstructor
	private class ViewsDto {
		private int today;
		private int total;

		private ViewsDto(Views views) {
			this.today = views.getToday();
			this.today = views.getTotal();
		}
	}

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
		this.views = views == null ? new ViewsDto() : new ViewsDto(views);
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
}

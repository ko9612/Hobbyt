package com.hobbyt.domain.member.dto.request;

import com.hobbyt.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest {
	private String nickname;
	private String description;
	private String profileImage;
	private String headerImage;

	public Member toEntity() {
		return Member.builder().nickname(nickname)
			.description(description)
			.profileImage(profileImage)
			.headerImage(headerImage)
			.build();
	}
}

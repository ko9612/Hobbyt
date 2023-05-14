package com.hobbyt.domain.privatehome.dto.request;

import javax.validation.constraints.Pattern;

import com.hobbyt.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRequest {
	@Pattern(regexp = "\\S{1,6}", message = "공백없이 6글자까지 입력 가능합니다.")
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

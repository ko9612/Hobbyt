package com.hobbyt.domain.follow.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FollowingDto {
	private Long id;
	private String nickname;
	private String profileImage;
	private String description;
	private Boolean dmReceive;
}

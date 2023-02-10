package com.hobbyt.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginInfo {
	private Long memberId;
	private String nickname;
	private String email;
}

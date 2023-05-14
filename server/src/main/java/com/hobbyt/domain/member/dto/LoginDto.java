package com.hobbyt.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {
	private Long id;
	private String nickname;
	private String accessToken;
	private String refreshToken;
}

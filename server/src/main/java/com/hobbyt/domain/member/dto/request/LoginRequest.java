package com.hobbyt.domain.member.dto.request;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class LoginRequest {
	@NotBlank(message = "아이디는 공백이 아니여야 합니다.")
	private String email;

	@NotBlank(message = "비밀번호는 공백이 아니여야 합니다.")
	private String password;
}

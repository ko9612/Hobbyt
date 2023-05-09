package com.hobbyt.domain.member.dto.request;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NewPassword {
	@NotBlank(message = "새로운 비밀번호를 입력해주세요.")
	private String password;
}

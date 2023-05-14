package com.hobbyt.domain.member.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequest {
	@Email(message = "이메일 형식으로 입력해주세요.")
	@NotBlank(message = "이메일을 입력해주세요.")
	private String email;
}

package com.hobbyt.domain.member.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.hobbyt.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
	@NotBlank(message = "활동을 위한 닉네임을 설정해주세요.")
	private String nickname;

	@Email(message = "이메일 형식으로 입력해주세요.")
	@NotBlank(message = "이메일을 입력해주세요.")
	private String email;

	@NotBlank(message = "비밀번호를 입력해주세요.")
	private String password;

	public Member toEntity(PasswordEncoder passwordEncoder, String profileImage, String headerImage) {
		return Member.builder()
			.nickname(nickname)
			.email(email)
			.password(passwordEncoder.encode(password))
			.profileImage(profileImage)
			.headerImage(headerImage)
			.build();
	}
}

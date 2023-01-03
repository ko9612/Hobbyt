package com.hobbyt.domain.user.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.hobbyt.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
	@NotBlank
	private String nickname;

	@Email
	@NotBlank
	private String email;

	@NotBlank
	private String password;

	public User toEntity(PasswordEncoder passwordEncoder, String profileImage) {
		return User.builder()
			.nickname(nickname)
			.email(email)
			.password(passwordEncoder.encode(password))
			.profileImage(profileImage)
			.build();
	}
}

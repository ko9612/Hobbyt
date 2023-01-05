package com.hobbyt.domain.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.UserRepository;
import com.hobbyt.global.error.exception.UserExistException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public Long createUser(SignupRequest signupRequest) {
		checkUserExist(signupRequest.getEmail());
		String profileImage = "S3 default image";    // S3의 기본 프로필 이미지
		Member member = signupRequest.toEntity(passwordEncoder, profileImage);

		return userRepository.save(member).getId();
	}

	private void checkUserExist(String email) {
		if (userRepository.existsByEmail(email)) {
			throw new UserExistException();
		}
	}
}

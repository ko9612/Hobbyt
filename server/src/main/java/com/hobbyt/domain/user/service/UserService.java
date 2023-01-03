package com.hobbyt.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.user.dto.request.SignupRequest;
import com.hobbyt.domain.user.entity.User;
import com.hobbyt.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public Long createUser(SignupRequest signupRequest) {
		checkUserExist(signupRequest.getEmail());
		String profileImage = "S3 default image";
		User user = signupRequest.toEntity(passwordEncoder, profileImage);

		userRepository.save(user);
		return userRepository.findByEmail(user.getEmail()).orElseThrow(IllegalArgumentException::new).getId();
	}

	private void checkUserExist(String email) {
		if (userRepository.existsByEmail(email)) {
			throw new IllegalArgumentException();
		}
	}
}

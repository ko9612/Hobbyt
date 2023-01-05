package com.hobbyt.domain.user.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hobbyt.domain.user.dto.request.SignupRequest;
import com.hobbyt.domain.user.entity.User;
import com.hobbyt.domain.user.repository.UserRepository;
import com.hobbyt.global.error.exception.UserExistException;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
	@Mock
	private UserRepository userRepository;
	@Mock
	private PasswordEncoder passwordEncoder;
	@InjectMocks
	private UserService userService;

	private SignupRequest signupRequest;
	private String profileImage;

	@BeforeEach
	void setup() {
		signupRequest = new SignupRequest("test", "test@gmail.com", "!test1234");
		profileImage = "default image";
	}

	@DisplayName("정상 회원가입")
	@Test
	public void create_user() {
		//given
		User result = createUser();
		given(userRepository.existsByEmail(anyString())).willReturn(false);
		given(userRepository.save(any(User.class))).willReturn(result);

		//when
		Long id = userService.createUser(signupRequest);

		//then
		// TODO argThat 부분 모든 값 비교하게끔?
		assertThat(id).isEqualTo(result.getId());
		then(userRepository).should(times(1))
			.existsByEmail(argThat(email -> email.equals(signupRequest.getEmail())));
		then(userRepository).should(times(1))
			.save(argThat(user -> user.getEmail().equals(signupRequest.getEmail())));
	}

	@DisplayName("UserExistException 예외: 중복 회원 존재")
	@Test
	public void validate_duplication_by_email() {
		willThrow(UserExistException.class).given(userRepository).existsByEmail(anyString());

		assertThatThrownBy(() -> userService.createUser(signupRequest))
			.isInstanceOf(UserExistException.class);

		then(userRepository).should(times(1)).existsByEmail(argThat(email -> email.equals(signupRequest.getEmail())));
	}

	private User createUser() {
		return User.builder()
			.id(1L)
			.nickname(signupRequest.getNickname())
			.email(signupRequest.getEmail())
			.password(passwordEncoder.encode(signupRequest.getPassword()))
			.profileImage(profileImage)
			.build();
	}
}
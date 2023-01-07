package com.hobbyt.domain.member.service;

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

import com.hobbyt.domain.member.dto.request.SignupRequest;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.error.exception.MemberExistException;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {
	@Mock
	private MemberRepository memberRepository;
	@Mock
	private PasswordEncoder passwordEncoder;
	@InjectMocks
	private MemberService memberService;

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
		Member result = createUser();
		given(memberRepository.existsByEmail(anyString())).willReturn(false);
		given(memberRepository.save(any(Member.class))).willReturn(result);

		//when
		Long id = memberService.createUser(signupRequest);

		//then
		// TODO argThat 부분 모든 값 비교하게끔?
		assertThat(id).isEqualTo(result.getId());
		then(memberRepository).should(times(1))
			.existsByEmail(argThat(email -> email.equals(signupRequest.getEmail())));
		then(memberRepository).should(times(1))
			.save(argThat(user -> user.getEmail().equals(signupRequest.getEmail())));
	}

	@DisplayName("UserExistException 예외: 중복 회원 존재")
	@Test
	public void validate_duplication_by_email() {
		willThrow(MemberExistException.class).given(memberRepository).existsByEmail(anyString());

		assertThatThrownBy(() -> memberService.createUser(signupRequest))
			.isInstanceOf(MemberExistException.class);

		then(memberRepository).should(times(1)).existsByEmail(argThat(email -> email.equals(signupRequest.getEmail())));
	}

	private Member createUser() {
		return Member.builder()
			.id(1L)
			.nickname(signupRequest.getNickname())
			.email(signupRequest.getEmail())
			.password(passwordEncoder.encode(signupRequest.getPassword()))
			.profileImage(profileImage)
			.build();
	}
}
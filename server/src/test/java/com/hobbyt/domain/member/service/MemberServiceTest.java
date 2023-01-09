package com.hobbyt.domain.member.service;

import static com.hobbyt.util.TestUtil.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

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

	@DisplayName("정상 회원가입")
	@Test
	public void create_user() {
		//given
		Member member = dummyMember(1L, NICKNAME, EMAIL, PASSWORD);
		SignupRequest signupRequest = new SignupRequest(NICKNAME, EMAIL, PASSWORD);
		given(memberRepository.existsByEmail(anyString())).willReturn(false);
		given(memberRepository.save(any(Member.class))).willReturn(member);

		//when
		Long id = memberService.createUser(signupRequest);

		//then
		// TODO argThat 부분 모든 값 비교하게끔?
		assertThat(id).isEqualTo(member.getId());
		then(memberRepository).should(times(1))
			.existsByEmail(argThat(email -> email.equals(EMAIL)));
		then(memberRepository).should(times(1))
			.save(argThat(user -> user.getEmail().equals(EMAIL)));
	}

	@DisplayName("UserExistException 예외: 중복 회원 존재")
	@Test
	public void validate_duplication_by_email() {
		SignupRequest signupRequest = new SignupRequest(NICKNAME, EMAIL, PASSWORD);
		willThrow(MemberExistException.class).given(memberRepository).existsByEmail(anyString());

		assertThatThrownBy(() -> memberService.createUser(signupRequest))
			.isInstanceOf(MemberExistException.class);

		then(memberRepository).should(times(1))
			.existsByEmail(argThat(email -> email.equals(EMAIL)));
	}
}
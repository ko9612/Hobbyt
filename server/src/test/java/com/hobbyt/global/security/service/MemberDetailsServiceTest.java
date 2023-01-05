package com.hobbyt.global.security.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import com.hobbyt.domain.member.entity.Authority;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.global.security.member.MemberDetails;

@ExtendWith(MockitoExtension.class)
class MemberDetailsServiceTest {
	@Mock
	private MemberRepository memberRepository;

	@InjectMocks
	private MemberDetailsService memberDetailsService;

	private Member member;

	@BeforeEach
	void setup() {
		member = Member.builder()
			.id(1L)
			.nickname("test")
			.email("test@gmail.com")
			.password("1234")
			.authority(Authority.ROLE_USER)
			.build();
	}

	@DisplayName("이메일이 일치하는 UserDetails 구현체 반환")
	@Test
	void load_user_by_username() {
		//given
		MemberDetails memberDetails = MemberDetails.of(this.member);
		given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(this.member));

		//when
		UserDetails userDetails = memberDetailsService.loadUserByUsername(this.member.getEmail());

		//then
		assertThat((MemberDetails)userDetails).isEqualTo(memberDetails);
		then(memberRepository).should(times(1))
			.findByEmail(argThat(email -> email.equals(this.member.getEmail())));
	}
}
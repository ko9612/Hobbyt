package com.hobbyt.domain.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.global.security.member.MemberDetails;

@TestConfiguration
public class TestMemberDetailService {
	@Bean
	@Primary
	public UserDetailsService userDetailsService() {
		Member member = Member.builder()
			.id(1L)
			.email("test@gmail.com")
			.password("{bcrypt}$2a$10$u52FA5zYKfZZmKpNjkNo8eHdzgabckaHOjoONH0tZUekoflKpdkAG")
			.nickname("test")
			.build();

		MemberDetails memberDetails = MemberDetails.of(member);

		return new UserDetailsService() {
			@Override
			public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				return memberDetails;
			}
		};
	}
}

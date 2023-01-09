package com.hobbyt.config;

import static com.hobbyt.util.TestUtil.*;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.hobbyt.global.security.member.MemberDetails;

@TestConfiguration
public class TestMemberDetailService {
	@Bean
	@Primary
	public UserDetailsService userDetailsService() {
		MemberDetails memberDetails = dummyMemberDetails(1L, NICKNAME, EMAIL, PASSWORD);

		return username -> memberDetails;
	}
}

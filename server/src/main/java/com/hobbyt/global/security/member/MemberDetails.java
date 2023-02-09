package com.hobbyt.global.security.member;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberDetails implements UserDetails, OAuth2User {
	private final String email;
	private final String authority;
	private Map<String, Object> attributes; // OAuth2의 필드값

	@Builder
	private MemberDetails(String email, String authority, Map<String, Object> attributes) {
		this.email = email;
		this.authority = authority;
		this.attributes = attributes;
	}

	// UserDetails를 구현한 MemberDetails를 만들기 위함 = 일반 로그인을 위해
	public static MemberDetails of(String email, String authority) {
		return MemberDetails.builder()
			.email(email)
			.authority(authority)
			.build();
	}

	// OAuth2User를 구현한 MemberDetails를 만들기 위함 = 소셜 로그인을 위해
	public static MemberDetails of(String email, String authority, Map<String, Object> attributes) {
		return MemberDetails.builder()
			.email(email)
			.authority(authority)
			.attributes(attributes)
			.build();
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority(authority.toString()));
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getName() {
		return email;
	}
}
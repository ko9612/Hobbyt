package com.hobbyt.global.security.member;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hobbyt.domain.member.entity.Authority;
import com.hobbyt.domain.member.entity.Member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberDetails implements UserDetails {

	private final Long id;
	private final String email;
	private final String password;
	private final Authority authority;

	public static MemberDetails of(Member member) {
		return new MemberDetails(member.getId(), member.getEmail(),
			member.getPassword(), member.getAuthority());
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		MemberDetails that = (MemberDetails)o;
		return Objects.equals(getId(), that.getId()) && Objects.equals(getEmail(), that.getEmail())
			&& Objects.equals(getPassword(), that.getPassword()) && Objects.equals(getAuthorities(),
			that.getAuthorities());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getEmail(), getPassword(), getAuthorities());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority(authority.toString()));
	}

	@Override
	public String getPassword() {
		return password;
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
}

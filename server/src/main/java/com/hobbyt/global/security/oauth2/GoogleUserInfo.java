package com.hobbyt.global.security.oauth2;

import java.util.Map;

import com.hobbyt.domain.member.entity.Provider;

public class GoogleUserInfo implements OAuth2UserInfo {
	private Map<String, Object> attributes;

	public GoogleUserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	@Override
	public String getProviderId() {
		return (String)attributes.get("sub");
	}

	@Override
	public Provider getProvider() {
		return Provider.google;
	}

	@Override
	public String getEmail() {
		return (String)attributes.get("email");
	}

	@Override
	public String getName() {
		return (String)attributes.get("name");
	}
}
package com.hobbyt.global.security.oauth2;

import java.util.Map;

import com.hobbyt.domain.member.entity.Provider;

public class NaverUserInfo implements OAuth2UserInfo {
	private Map<String, Object> attributes;
	private Map<String, Object> attributesResponse;

	public NaverUserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
		this.attributesResponse = (Map<String, Object>)attributes.get("response");
	}

	@Override
	public String getProviderId() {
		return attributesResponse.get("id").toString();
	}

	@Override
	public Provider getProvider() {
		return Provider.naver;
	}

	@Override
	public String getEmail() {
		return (String)attributesResponse.get("email");
	}

	@Override
	public String getName() {
		return (String)attributesResponse.get("name");
	}
}
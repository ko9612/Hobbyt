package com.hobbyt.global.security.oauth2;

import java.util.Map;

import com.hobbyt.domain.member.entity.Provider;

public class KakaoUserInfo implements OAuth2UserInfo {
	private Map<String, Object> attributes;
	private Map<String, Object> attributesAccount;
	private Map<String, Object> attributesProfile;

	public KakaoUserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
		this.attributesAccount = (Map<String, Object>)attributes.get("kakao_account");
		this.attributesProfile = (Map<String, Object>)attributesAccount.get("profile");
	}

	@Override
	public String getProviderId() {
		return attributes.get("id").toString();
	}

	@Override
	public Provider getProvider() {
		return Provider.kakao;
	}

	@Override
	public String getEmail() {
		return (String)attributesAccount.get("email");
	}

	@Override
	public String getName() {
		return (String)attributesProfile.get("nickname");
	}
}
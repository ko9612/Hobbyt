package com.hobbyt.global.security.oauth2;

import com.hobbyt.domain.member.entity.Provider;

public interface OAuth2UserInfo {
	String getProviderId();

	Provider getProvider();

	String getEmail();

	String getName();
}
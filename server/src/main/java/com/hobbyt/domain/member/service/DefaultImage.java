package com.hobbyt.domain.member.service;

import lombok.Getter;

@Getter
public enum DefaultImage {
	profile("기본 프로필 이미지", "/api/images/a30a68de-0bab-45c0-93ec-1802de8c62ed.jpg"),
	header("기본 헤더 이미지", "/api/images/e048f178-9a96-4f59-a6e9-8991abb700d7.jpg");

	private String name;
	private String value;

	DefaultImage(String name, String value) {
		this.name = name;
		this.value = value;
	}
}

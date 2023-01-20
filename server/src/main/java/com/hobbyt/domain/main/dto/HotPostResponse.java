package com.hobbyt.domain.main.dto;

import java.util.List;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HotPostResponse {
	private final List<HotPost> hotPosts;
}

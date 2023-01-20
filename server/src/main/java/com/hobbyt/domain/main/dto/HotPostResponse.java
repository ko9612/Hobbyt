package com.hobbyt.domain.main.dto;

import java.util.List;

import com.hobbyt.domain.main.entity.HotPost;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HotPostResponse {
	private final List<HotPost> hotPosts;
}

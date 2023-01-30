package com.hobbyt.domain.main.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HotBloggerResponse {
	private List<HotBlogger> hotBloggers;

	public static class HotBlogger {
		private Long bloggerId;
		private String nickname;
		private String profileImage;
	}
}

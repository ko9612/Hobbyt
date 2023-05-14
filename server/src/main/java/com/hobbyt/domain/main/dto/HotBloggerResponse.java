package com.hobbyt.domain.main.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class HotBloggerResponse {
	private List<HotBlogger> hotBloggers;

	@Getter
	@NoArgsConstructor
	public static class HotBlogger {
		private Long bloggerId;
		private String nickname;
		private String profileImage;
	}
}

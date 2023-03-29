package com.hobbyt.domain.main.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HotPost {
	private Long id;
	private String title;
	private String content;
	private String thumbnailImage;
	private long viewCount;
	private long likeCount;
	private Long writerId;
	private String nickname;
	private String profileImage;
	private LocalDateTime createdAt;
}

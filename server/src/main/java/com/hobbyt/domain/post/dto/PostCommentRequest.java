package com.hobbyt.domain.post.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostCommentRequest {
	@Min(value = 0)
	private Long postId;
	@NotNull
	private String content;
}

package com.hobbyt.domain.post.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostCommentRequest {
	@NotNull
	private String content;
}

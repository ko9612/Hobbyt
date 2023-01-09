package com.hobbyt.domain.post.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostRequest {
	@NotNull
	private String title;
	@NotNull
	private String content;
	private List<String> tags;
}

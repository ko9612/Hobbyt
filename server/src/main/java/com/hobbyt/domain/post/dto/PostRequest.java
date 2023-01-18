package com.hobbyt.domain.post.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.hobbyt.domain.post.entity.Post;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostRequest {
	@NotNull
	private String title;
	@NotNull
	private String content;
	private Boolean isPublic;
	private List<String> tags;

	public Post toPost() {
		return Post.of(title, content, isPublic);
	}
}

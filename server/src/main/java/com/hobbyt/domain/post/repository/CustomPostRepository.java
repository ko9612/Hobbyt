package com.hobbyt.domain.post.repository;

import java.util.List;

import com.hobbyt.domain.post.dto.PostResponse;

public interface CustomPostRepository {
	List<PostResponse.CommentBox> getPostCommentsByPostId(Long postId);

	List<String> getTagsByPostId(Long postId);
}

package com.hobbyt.domain.post.repository;

import com.hobbyt.domain.post.dto.PostResponse;

public interface CustomPostRepository {
	PostResponse getPostDetailById(Long id);
}

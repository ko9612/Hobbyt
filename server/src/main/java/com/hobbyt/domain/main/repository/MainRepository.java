package com.hobbyt.domain.main.repository;

import java.util.List;

import com.hobbyt.domain.main.dto.HotPost;

public interface MainRepository {
	List<HotPost> getHotPosts();
}
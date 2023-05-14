package com.hobbyt.domain.main.repository;

import java.util.List;

import com.hobbyt.domain.main.dto.HotBloggerResponse;
import com.hobbyt.domain.main.dto.HotPost;
import com.hobbyt.domain.main.dto.SaleRequest;
import com.hobbyt.domain.main.dto.SaleResponse;

public interface MainRepository {
	List<HotPost> getHotPosts();

	HotBloggerResponse getHotBloggers(int count);

	SaleResponse getSaleResponse(SaleRequest request);
}

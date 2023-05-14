package com.hobbyt.domain.main.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hobbyt.domain.main.dto.HotBloggerResponse;
import com.hobbyt.domain.main.dto.HotPost;
import com.hobbyt.domain.main.dto.SaleRequest;
import com.hobbyt.domain.main.dto.SaleResponse;
import com.hobbyt.domain.main.repository.MainRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainService {
	private final MainRepository mainRepository;

	public List<HotPost> getAllHotPosts() {

		return mainRepository.getHotPosts();
	}

	public HotBloggerResponse getHotBloggers(int count) {
		return mainRepository.getHotBloggers(count);
	}

	public SaleResponse getSales(SaleRequest request) {
		return mainRepository.getSaleResponse(request);
	}

}

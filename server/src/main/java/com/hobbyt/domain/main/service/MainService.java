package com.hobbyt.domain.main.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hobbyt.domain.main.dto.HotPost;
import com.hobbyt.domain.main.repository.HotPostRepository;
import com.hobbyt.domain.main.repository.MainRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainService {
	private final HotPostRepository hotPostRepository;
	private final MainRepository mainRepository;

	public List<HotPost> getAll() {
		List<HotPost> hotPosts = new ArrayList<>();
		hotPostRepository.findAll().forEach(hotPosts::add);

		if (hotPosts.isEmpty()) {
			loadHotPosts();
			hotPostRepository.findAll().forEach(hotPosts::add);
		}

		return hotPosts;
	}

	@Scheduled(cron = "0 0 0/1 * * *")
	public void loadHotPosts() {
		hotPostRepository.saveAll(
			mainRepository.getHotPosts()
		);
	}
}

package com.hobbyt.domain.main.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.main.dto.HotPost;
import com.hobbyt.domain.main.dto.HotPostResponse;
import com.hobbyt.domain.main.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class MainController {
	private final MainService mainService;

	@GetMapping("/hot-posts")
	public ResponseEntity<HotPostResponse> getHotPosts() {
		List<HotPost> hotPosts = mainService.getAll();

		return ResponseEntity.ok(new HotPostResponse(hotPosts));
	}
}

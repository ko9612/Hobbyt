package com.hobbyt.domain.privatehome.controller;

import javax.validation.constraints.Min;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;
import com.hobbyt.domain.privatehome.service.PrivateHomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members/{id}/private")
@RequiredArgsConstructor
@Validated
public class PrivateHomeController {
	private final PrivateHomeService privateHomeService;

	@GetMapping("/posts")
	public ResponseEntity<PrivateHomePostResponse> getPostList(
		@Min(value = 0) @PathVariable Long id, @ModelAttribute PrivateHomeRequest.Get params) {

		PrivateHomePostResponse response = privateHomeService
			.getBlogListByMemberId(id, new PrivateHomeServiceDto.Get(params));

		return ResponseEntity.ok(response);
	}

	@GetMapping("/comments")
	public ResponseEntity<PrivateHomeCommentResponse> getCommentList(
		@Min(value = 0) @PathVariable Long id, @ModelAttribute PrivateHomeRequest.Get params) {

		PrivateHomeCommentResponse response = privateHomeService
			.getCommentListByMemberId(id, new PrivateHomeServiceDto.Get(params));

		return ResponseEntity.ok(response);
	}
}

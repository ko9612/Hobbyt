package com.hobbyt.domain.search.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;
import com.hobbyt.domain.search.service.SearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@Validated
public class SearchController {
	private final SearchService searchService;

	@GetMapping("/posts")
	public ResponseEntity<SearchPostResponse> searchPostsByKeyword(@ModelAttribute SearchRequest params) {
		SearchPostResponse response = searchService.searchPostsByKeyword(params);

		return ResponseEntity.ok(response);
	}
}
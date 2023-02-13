package com.hobbyt.domain.privatehome.controller;

import javax.validation.constraints.Min;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleResponse;
import com.hobbyt.domain.privatehome.service.PrivateHomeService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members/{memberId}/private")
@RequiredArgsConstructor
@Validated
public class PrivateHomeController {
	private final PrivateHomeService privateHomeService;

	@GetMapping("/posts")
	public ResponseEntity<PrivateHomePostResponse> getPostList(
		@Min(value = 0) @PathVariable Long memberId, @ModelAttribute PrivateHomeRequest params,
		@AuthenticationPrincipal MemberDetails loginMember) {

		PrivateHomePostResponse response = privateHomeService
			.getBlogListByMemberId(memberId, params, loginMember);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/comments")
	public ResponseEntity<PrivateHomeCommentResponse> getCommentList(
		@Min(value = 0) @PathVariable Long memberId, @ModelAttribute PrivateHomeRequest params) {

		PrivateHomeCommentResponse response = privateHomeService
			.getCommentListByMemberId(memberId, params);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/post-likes")
	public ResponseEntity<PrivateHomePostLikeResponse> getPostLikeList(
		@Min(value = 0) @PathVariable Long memberId, @ModelAttribute PrivateHomeRequest params) {
		PrivateHomePostLikeResponse response = privateHomeService
			.getPostLikeListByMemberId(memberId, params);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/sales")
	public ResponseEntity getSales(@Min(value = 1) @PathVariable Long memberId, PrivateHomeRequest params) {
		PrivateHomeSaleResponse response = privateHomeService.getSales(memberId, params);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/sale-likes")
	public ResponseEntity getSaleLikeList(@Min(value = 1) @PathVariable Long memberId,
		@ModelAttribute PrivateHomeRequest params) {

		PrivateHomeSaleLikeResponse response = privateHomeService
			.getSaleLikeListByMemberId(memberId, params);

		return ResponseEntity.ok(response);
	}
}

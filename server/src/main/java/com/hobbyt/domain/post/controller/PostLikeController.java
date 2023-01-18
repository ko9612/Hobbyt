package com.hobbyt.domain.post.controller;

import javax.validation.constraints.Min;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.post.service.PostLikeService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts/{post-id}/like")
@RequiredArgsConstructor
public class PostLikeController {
	private final PostLikeService postLikeService;

	@PostMapping
	public ResponseEntity<Void> likePost(
		@AuthenticationPrincipal MemberDetails loginMember,
		@Min(value = 0) @PathVariable(name = "post-id") Long postId) {

		postLikeService.createPostLike(loginMember.getEmail(), postId);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping
	public ResponseEntity<Void> cancelLike(
		@AuthenticationPrincipal MemberDetails loginMember,
		@Min(value = 0) @PathVariable(name = "post-id") Long postId) {

		postLikeService.deletePostLike(loginMember.getEmail(), postId);

		return ResponseEntity.ok().build();
	}
}

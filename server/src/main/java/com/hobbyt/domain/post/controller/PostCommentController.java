package com.hobbyt.domain.post.controller;

import javax.validation.Valid;
import javax.validation.constraints.Min;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.post.dto.PostCommentRequest;
import com.hobbyt.domain.post.service.PostCommentService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/post-comments")
@RequiredArgsConstructor
@Validated
public class PostCommentController {
	private final PostCommentService postCommentService;

	@PostMapping
	public ResponseEntity<Long> postComment(
		@AuthenticationPrincipal MemberDetails loginMember, @Valid @RequestBody PostCommentRequest request) {
		Long createdId = postCommentService.createPostComment(loginMember.getEmail(), request);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdId);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchComment(@Min(value = 0) @PathVariable Long id,
		@Valid @RequestBody PostCommentRequest request) {
		Long updatedId = postCommentService.updatePostComment(id, request);

		return ResponseEntity.ok(updatedId);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteComment(@Min(value = 0) @PathVariable Long id) {
		postCommentService.deletePostCommentById(id);

		return ResponseEntity.noContent().build();
	}
}

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

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.post.dto.PostCommentRequest;
import com.hobbyt.domain.post.service.PostCommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/post/comment")
@RequiredArgsConstructor
@Validated
public class PostCommentController {
	private final PostCommentService postCommentService;

	@PostMapping
	public ResponseEntity<Long> postComment(@AuthenticationPrincipal Member member,
		@Valid @RequestBody PostCommentRequest request) {

		return ResponseEntity.status(HttpStatus.CREATED).body(1L);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchComment(@Min(value = 0) @PathVariable Long id,
		@Valid @RequestBody PostCommentRequest request) {

		return ResponseEntity.ok(1L);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteComment(@Min(value = 0) @PathVariable Long id) {

		return ResponseEntity.noContent().build();
	}
}

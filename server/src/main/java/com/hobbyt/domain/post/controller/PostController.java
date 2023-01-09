package com.hobbyt.domain.post.controller;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Min;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.post.dto.PostRequest;
import com.hobbyt.domain.post.dto.PostResponse;
import com.hobbyt.domain.post.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Validated
public class PostController {
	private final PostService postService;

	@GetMapping("{id}")
	private ResponseEntity<PostResponse> getPost(@Min(value = 0) @PathVariable Long id) {
		PostResponse.WriterBox writer = new PostResponse.WriterBox(
			"호빗", null, LocalDateTime.now(), 50, 50
		);

		PostResponse.CommentBox comment1 = new PostResponse.CommentBox(
			"엘프", null, LocalDateTime.now(), "굿굿"
		);
		PostResponse.CommentBox comment2 = new PostResponse.CommentBox(
			"오크", null, LocalDateTime.now(), "ㄴㄴ"
		);

		List<PostResponse.CommentBox> comments = List.of(comment1, comment2);

		PostResponse response = new PostResponse(
			"제목", "본문", 100, 10, LocalDateTime.now(), writer, comments
		);

		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Long> postPost(
		@AuthenticationPrincipal Member member,
		@Valid @RequestBody PostRequest request) {

		return ResponseEntity.status(HttpStatus.CREATED).body(1L);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchPost(
		@Min(value = 0) @PathVariable Long id,
		@Valid @RequestBody PostRequest request) {

		return ResponseEntity.ok(1L);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePost(@Min(value = 0) @PathVariable Long id) {

		return ResponseEntity.noContent().build();
	}
}

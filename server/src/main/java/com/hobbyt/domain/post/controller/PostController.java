package com.hobbyt.domain.post.controller;

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

import com.hobbyt.domain.post.dto.PostRequest;
import com.hobbyt.domain.post.dto.PostResponse;
import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.service.PostService;
import com.hobbyt.domain.post.service.PostTagService;
import com.hobbyt.domain.tag.entity.Tag;
import com.hobbyt.domain.tag.service.TagService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@Validated
public class PostController {
	private final PostService postService;
	private final PostTagService postTagService;
	private final TagService tagService;

	@GetMapping("{id}")
	public ResponseEntity<PostResponse> getPost(@Min(value = 0) @PathVariable Long id,
		@AuthenticationPrincipal MemberDetails loginMember) {
		PostResponse response = postService.getPostDetailById(id, loginMember);

		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Long> postPost(
		@AuthenticationPrincipal MemberDetails loginMember, @Valid @RequestBody PostRequest request) {

		Post created = postService.createPost(loginMember.getEmail(), request.toPost());
		List<Tag> tags = tagService.addTags(request.getTags());
		postTagService.addTagsToPost(created, tags);

		return ResponseEntity.status(HttpStatus.CREATED).body(created.getId());
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Long> patchPost(
		@Min(value = 0) @PathVariable Long id, @Valid @RequestBody PostRequest request) {

		Post updated = postService.updatePost(id, request.toPost());
		List<Tag> tags = tagService.addTags(request.getTags());
		postTagService.updateTagsToPost(updated, tags);

		return ResponseEntity.ok(updated.getId());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePost(@Min(value = 0) @PathVariable Long id) {
		postService.deletePost(id);

		return ResponseEntity.noContent().build();
	}
}

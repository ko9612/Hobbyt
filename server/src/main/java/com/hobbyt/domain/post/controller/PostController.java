package com.hobbyt.domain.post.controller;

import static com.hobbyt.domain.post.dto.PostResponse.*;

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
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Validated
public class PostController {
	private final PostService postService;
	private final PostTagService postTagService;
	private final TagService tagService;

	@GetMapping("{id}")
	private ResponseEntity<PostResponse> getPost(@Min(value = 0) @PathVariable Long id) {

		CommentBox comment1 = new CommentBox(1L, "엘프", null, LocalDateTime.now(), "굿굿");
		CommentBox comment2 = new CommentBox(1L, "호빗", null, LocalDateTime.now(), "ㄴㄴ");

		List<CommentBox> comments = List.of(comment1, comment2);
		List<String> tags = List.of("취미", "크리어처");

		WriterBox writer = new WriterBox(1L, "잉간", null, LocalDateTime.now(), 50, 50);

		PostResponse response = new PostResponse(
			1L, "제목", "본문", null, 100, 10, true, LocalDateTime.now(), writer, comments, tags);

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

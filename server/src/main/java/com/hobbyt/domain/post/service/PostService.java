package com.hobbyt.domain.post.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.post.dto.PostResponse;
import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.repository.PostRepository;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
	private final PostRepository postRepository;
	private final MemberService memberService;

	public PostResponse getPostDetailById(Long id) {
		// Post post = findVerifiedOneById(id);
		Post post = postRepository.findForUpdateById(id).orElseThrow(() -> new BusinessLogicException(POST_NOT_FOUND));

		List<PostResponse.CommentBox> comments = postRepository.getPostCommentsByPostId(id);
		List<String> tags = postRepository.getTagsByPostId(id);

		post.increaseViewCount();

		return new PostResponse(post, comments, tags);
	}

	public Post createPost(String email, Post post) {
		Member writer = memberService.findMemberByEmail(email);
		post.setWriter(writer);

		return postRepository.save(post);
	}

	public Post updatePost(Long id, Post post) {
		Post found = findVerifiedOneById(id);

		Optional.ofNullable(post.getTitle()).ifPresent(found::updateTitle);
		Optional.ofNullable(post.getContent()).ifPresent(found::updateContent);
		Optional.ofNullable(post.getThumbnailImage()).ifPresent(found::updateThumbnailImage);
		found.updateIsPublic(post.getIsPublic());

		return found;
	}

	public void deletePost(Long id) {
		postRepository.delete(
			findVerifiedOneById(id)
		);
	}

	public Post findVerifiedOneById(Long id) {
		return postRepository.findById(id)
			.orElseThrow(() -> new BusinessLogicException(POST_NOT_FOUND));
	}
}

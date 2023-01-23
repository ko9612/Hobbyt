package com.hobbyt.domain.post.service;

import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.notification.dto.PostCommentEvent;
import com.hobbyt.domain.post.dto.PostCommentRequest;
import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.entity.PostComment;
import com.hobbyt.domain.post.repository.PostCommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PostCommentService {
	private final PostCommentRepository postCommentRepository;
	private final PostService postService;
	private final MemberService memberService;
	private final ApplicationEventPublisher eventPublisher;

	public Long createPostComment(String email, PostCommentRequest request) {
		Post post = postService.findVerifiedOneById(request.getPostId());
		Member writer = memberService.findMemberByEmail(email);
		PostComment comment = PostComment.of(writer, post, request.getContent());

		eventPublisher.publishEvent(PostCommentEvent.builder()
			.receiver(post.getWriter())
			.sender(writer.getNickname())
			.postId(post.getId())
			.title(post.getTitle()));

		return postCommentRepository.save(comment).getId();
	}

	public Long updatePostComment(Long id, PostCommentRequest request) {
		PostComment comment = findVerifiedCommentById(id);
		comment.updateContent(request.getContent());

		return comment.getId();
	}

	public void deletePostCommentById(Long id) {
		PostComment comment = findVerifiedCommentById(id);
		postCommentRepository.delete(comment);
	}

	public PostComment findVerifiedCommentById(Long id) {
		Optional<PostComment> found = postCommentRepository.findById(id);

		return found.orElseThrow(
			() -> new RuntimeException("Comment Not Exist")
		);
	}
}

package com.hobbyt.domain.post.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.post.dto.PostResponse;
import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.repository.PostRepository;
import com.hobbyt.domain.privatehome.service.PrivateHomeService;
import com.hobbyt.global.error.exception.BusinessLogicException;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
	private final PostRepository postRepository;
	private final MemberService memberService;
	private final PrivateHomeService privateHomeService;

	public PostResponse getPostDetailById(Long id, MemberDetails loginMember) {
		Post post = findVerifiedOneById(id);

		if (loginMember != null) {
			Member writer = post.getWriter();
			privateHomeService.countVisitor(writer.getId(), loginMember.getEmail());
		}

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

		found.updateTitle(post.getTitle());
		found.updateContent(post.getContent());
		found.updateThumbnailImage(post.getThumbnailImage());
		found.updateIsPublic(post.isPublic());

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

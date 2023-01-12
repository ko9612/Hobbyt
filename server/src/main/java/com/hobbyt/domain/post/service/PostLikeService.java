package com.hobbyt.domain.post.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.entity.PostLike;
import com.hobbyt.domain.post.repository.PostLikeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PostLikeService {
	private final PostLikeRepository postLikeRepository;
	private final PostService postService;

	public void createPostLike(Member member, Long postId) {
		Post post = postService.findVerifiedOneById(postId);

		postLikeRepository.save(
			PostLike.of(member, post));
		post.updateLikeCount(+1);
	}

	public void deletePostLike(Member member, Long postId) {
		Post post = postService.findVerifiedOneById(postId);
		Optional<PostLike> found = postLikeRepository.findByMemberAndPost(member, post);

		if (found.isPresent()) {
			postLikeRepository.delete(found.get());
			post.updateLikeCount(-1);
		}
	}
}

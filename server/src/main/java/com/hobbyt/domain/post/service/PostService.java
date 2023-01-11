package com.hobbyt.domain.post.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.repository.PostRepository;
import com.hobbyt.global.error.exception.PostNotExistException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
	private final PostRepository postRepository;

	public Post createPost(Member writer, Post post) {
		post.setWriter(writer);

		return postRepository.save(post);
	}

	public Post updatePost(Long id, Post post) {
		Post found = findVerifiedOneById(id);
		found.updateTitle(post.getTitle());
		found.updateContent(post.getContent());

		return found;
	}

	public void deletePost(Long id) {
		postRepository.delete(
			findVerifiedOneById(id)
		);
	}

	public Post findVerifiedOneById(Long id) {
		return postRepository.findById(id)
			.orElseThrow(() -> new PostNotExistException("Post Having The Id Not Exist"));
	}
}

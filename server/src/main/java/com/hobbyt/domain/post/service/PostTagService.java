package com.hobbyt.domain.post.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.entity.PostTag;
import com.hobbyt.domain.post.repository.PostTagRepository;
import com.hobbyt.domain.tag.entity.Tag;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PostTagService {
	private final PostTagRepository postTagRepository;

	public void addTagsToPost(Post post, List<Tag> tags) {
		tags.forEach(
			tag -> createOrFindIfExist(post, tag));
	}

	private PostTag createOrFindIfExist(Post post, Tag tag) {
		Optional<PostTag> found = postTagRepository.findByPostAndTag(post, tag);

		return found.orElseGet(
			() -> PostTag.of(post, tag));
	}
}

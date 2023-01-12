package com.hobbyt.domain.post.service;

import java.util.List;
import java.util.Map;

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
			tag -> createPostTag(post, tag));
	}

	public void updateTagsToPost(Post post, List<Tag> tags) {
		Map<Tag, PostTag> map = postTagRepository.getTagPostTagMapByPostId(post.getId());

		for (Tag tag : tags) {
			if (map.containsKey(tag)) {
				map.remove(tag);
				continue;
			}

			createPostTag(post, tag);
		}

		removePostTags(map.values());
	}

	private void createPostTag(Post post, Tag tag) {
		postTagRepository.save(
			PostTag.of(post, tag));
	}

	private void removePostTags(Iterable<PostTag> tags) {
		postTagRepository.deleteAllInBatch(tags);
	}
}

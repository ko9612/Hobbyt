package com.hobbyt.domain.post.repository;

import java.util.Map;

import com.hobbyt.domain.post.entity.PostTag;
import com.hobbyt.domain.tag.entity.Tag;

public interface CustomPostTagRepository {
	Map<Tag, PostTag> getTagPostTagMapByPostId(Long postId);
}

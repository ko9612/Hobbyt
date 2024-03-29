package com.hobbyt.domain.post.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.entity.PostTag;
import com.hobbyt.domain.tag.entity.Tag;

public interface PostTagRepository extends JpaRepository<PostTag, Long>, CustomPostTagRepository {
	Optional<PostTag> findByPostAndTag(Post post, Tag tag);

	List<PostTag> findAllByPost(Post post);
}

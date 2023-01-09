package com.hobbyt.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.post.entity.PostTag;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {
}

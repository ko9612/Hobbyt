package com.hobbyt.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.post.entity.PostLike;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
}

package com.hobbyt.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.post.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}

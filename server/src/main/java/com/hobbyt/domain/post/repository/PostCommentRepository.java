package com.hobbyt.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.post.entity.PostComment;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
}

package com.hobbyt.domain.post.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.post.entity.Post;
import com.hobbyt.domain.post.entity.PostLike;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
	Optional<PostLike> findByMemberAndPost(Member member, Post post);
}

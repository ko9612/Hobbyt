package com.hobbyt.domain.post.repository;

import java.util.Optional;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import com.hobbyt.domain.post.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long>, CustomPostRepository {
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	Optional<Post> findForUpdateById(Long id);
}

package com.hobbyt.domain.tag.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.tag.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long>, CustomTagRepository {
	Optional<Tag> findByContent(String content);
}

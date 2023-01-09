package com.hobbyt.global.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.global.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
}

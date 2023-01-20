package com.hobbyt.domain.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.hobbyt.domain.main.entity.HotPost;

public interface HotPostRepository extends CrudRepository<HotPost, Long> {
}

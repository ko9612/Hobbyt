package com.hobbyt.domain.follow.repository;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.follow.dto.SliceDto;

public interface CustomFollowRepository {
	SliceDto findFollowingByEmail(String email, Pageable pageable);

}

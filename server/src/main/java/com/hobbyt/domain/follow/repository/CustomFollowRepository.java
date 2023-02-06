package com.hobbyt.domain.follow.repository;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.follow.dto.SliceDto;
import com.hobbyt.domain.member.entity.Member;

public interface CustomFollowRepository {
	SliceDto findFollowing(Member myInfo, Long memberId, Pageable pageable);

	SliceDto findFollower(Member myInfo, Long memberId, Pageable pageable);
}

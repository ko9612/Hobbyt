package com.hobbyt.domain.follow.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.follow.dto.FollowDto;
import com.hobbyt.domain.member.entity.Member;

public interface CustomFollowRepository {
	/*SliceDto findFollowing(Member myInfo, Long targetMemberId, Pageable pageable);

	SliceDto findFollower(Member myInfo, Long targetMemberId, Pageable pageable);*/

	List<FollowDto> findFollowings(Long targetMemberId, Pageable pageable);

	List<FollowDto> findFollowers(Long targetMemberId, Pageable pageable);

	void compareMyFollowing(Member myInfo, List<FollowDto> contents);
}

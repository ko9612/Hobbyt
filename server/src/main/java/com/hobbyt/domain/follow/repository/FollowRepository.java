package com.hobbyt.domain.follow.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.follow.entity.Follow;
import com.hobbyt.domain.member.entity.Member;

public interface FollowRepository extends JpaRepository<Follow, Long>, CustomFollowRepository {
	Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);
}

package com.hobbyt.domain.follow.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.follow.entity.Follow;
import com.hobbyt.domain.follow.repository.FollowRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {
	private final FollowRepository followRepository;
	private final MemberService memberService;

	public void following(String loginEmail, Long memberId) {
		Member follower = memberService.findMemberByEmail(loginEmail);
		Member following = memberService.findMemberById(memberId);

		Optional<Follow> followOrNull = followRepository.findByFollowerAndFollowing(follower, following);
		followOrNull.ifPresentOrElse(
			follow -> {
				followRepository.delete(follow);
				follower.followingDown();
				following.followerDown();
			},
			() -> {
				followRepository.save(Follow.of(follower, following));
				follower.followingUp();
				following.followerUp();
			}
		);
	}
}

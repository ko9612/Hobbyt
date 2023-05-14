package com.hobbyt.domain.follow.service;

import java.util.Optional;
import java.util.function.Consumer;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.follow.entity.Follow;
import com.hobbyt.domain.follow.repository.FollowRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {
	private final FollowRepository followRepository;
	private final MemberService memberService;

	@Transactional
	public void following(String loginEmail, Long memberId) {
		Member follower = memberService.findMemberByEmail(loginEmail);
		Member following = memberService.findMemberById(memberId);

		cancelOrFollow(follower, following);
	}

	private void cancelOrFollow(Member follower, Member following) {
		Optional<Follow> nullableFollow = followRepository.findByFollowerAndFollowing(follower, following);
		nullableFollow.ifPresentOrElse(cancel(follower, following), follow(follower, following));
	}

	private Runnable follow(Member follower, Member following) {
		return () -> {
			followRepository.save(Follow.of(follower, following));
			follower.followingUp();
			following.followerUp();
		};
	}

	private Consumer<Follow> cancel(Member follower, Member following) {
		return follow -> {
			followRepository.delete(follow);
			follower.followingDown();
			following.followerDown();
		};
	}
}

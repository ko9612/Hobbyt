package com.hobbyt.domain.follow.service;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.follow.dto.SliceDto;
import com.hobbyt.domain.follow.dto.SliceResponse;
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

	public SliceResponse getFollowing(String email, Long memberId, Pageable pageable) {
		Member member = memberService.findMemberByEmail(email);
		SliceDto sliceDto = followRepository.findFollowing(member, memberId, pageable);
		Slice<SliceDto> slice = new SliceImpl<>(sliceDto.getContents(), pageable, sliceDto.getHasNext());
		return SliceResponse.of(slice);
	}

	public SliceResponse getFollower(String email, Long memberId, Pageable pageable) {
		Member member = memberService.findMemberByEmail(email);
		SliceDto sliceDto = followRepository.findFollower(member, memberId, pageable);
		Slice<SliceDto> slice = new SliceImpl<>(sliceDto.getContents(), pageable, sliceDto.getHasNext());
		return SliceResponse.of(slice);
	}
}

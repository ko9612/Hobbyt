package com.hobbyt.domain.follow.service;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

import com.hobbyt.domain.follow.dto.FollowDto;
import com.hobbyt.domain.follow.repository.FollowQueryRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.global.dto.SliceResponse;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FollowQueryService {
	private final MemberService memberService;
	private final FollowQueryRepository followQueryRepository;

	public SliceResponse getFollowing(MemberDetails loginMember, Long targetMemberId, Pageable pageable) {
		List<FollowDto> contents = followQueryRepository.findFollowings(targetMemberId, pageable);
		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		if (!Objects.isNull(loginMember)) {
			Member myInfo = memberService.findMemberByEmail(loginMember.getEmail());
			compareMyFollowing(myInfo, contents);
		}

		Slice slice = new SliceImpl<>(contents, pageable, hasNext);
		return SliceResponse.of(slice);
	}

	public SliceResponse getFollower(MemberDetails loginMember, Long targetMemberId, Pageable pageable) {
		List<FollowDto> contents = followQueryRepository.findFollowers(targetMemberId, pageable);
		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		if (!Objects.isNull(loginMember)) {
			Member myInfo = memberService.findMemberByEmail(loginMember.getEmail());
			compareMyFollowing(myInfo, contents);
		}

		Slice slice = new SliceImpl<>(contents, pageable, hasNext);
		return SliceResponse.of(slice);
	}

	public Boolean getHasNext(List<?> contents, int limit) {
		if (contents.size() > limit) {
			contents.remove(limit);
			return true;
		}

		return false;
	}

	private void compareMyFollowing(Member myInfo, List<FollowDto> contents) {
		List<Long> myFollowingId = followQueryRepository.findFollowingIdByMember(myInfo);
		contents.forEach(content -> {
			if (content.getId() == myInfo.getId()) {
				return;
			}
			content.setIsFollowing(myFollowingId.contains(content.getId()));
		});
	}
}

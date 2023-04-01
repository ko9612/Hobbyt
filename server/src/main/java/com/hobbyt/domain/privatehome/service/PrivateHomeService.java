package com.hobbyt.domain.privatehome.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.follow.repository.FollowQueryRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.privatehome.dto.request.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.request.ProfileRequest;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleResponse;
import com.hobbyt.domain.privatehome.dto.response.ProfileResponse;
import com.hobbyt.domain.privatehome.repository.PrivateHomeRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PrivateHomeService {
	private final MemberService memberService;
	private final PrivateHomeRepository privateHomeRepository;
	private final FollowQueryRepository followQueryRepository;
	private final VisitService visitService;

	@Transactional
	public ProfileResponse getProfile(final Long targetMemberId, String email) {
		Member targetMember = memberService.findMemberById(targetMemberId);
		ProfileResponse profileResponse = null;

		visitService.countVisitor(targetMemberId, email);
		profileResponse = ProfileResponse.of(targetMember);
		profileResponse.setIsFollowing(isFollowing(targetMemberId, email));

		return profileResponse;
	}

	@Transactional
	public void updateProfile(final String email, final ProfileRequest profileRequest) {
		Member member = memberService.findMemberByEmail(email);

		Member updateProfile = profileRequest.toEntity();

		member.updateProfile(updateProfile);
	}

	private Boolean isFollowing(Long targetMemberId, String email) {
		Member myInfo = memberService.findMemberByEmail(email);

		if (targetMemberId != myInfo.getId()) {
			List<Long> myFollowingId = followQueryRepository.findFollowingIdByMember(myInfo);
			return myFollowingId.contains(targetMemberId);
		}

		return null;
	}

	@Transactional
	public PrivateHomePostResponse getBlogListByMemberId(Long memberId, PrivateHomeRequest params) {
		return privateHomeRepository.getBlogListByWriterId(memberId, params);
	}

	public PrivateHomeCommentResponse getCommentListByMemberId(Long id, PrivateHomeRequest params) {
		return privateHomeRepository.getCommentListByWriterId(id, params);
	}

	public PrivateHomeSaleResponse getSales(Long id, PrivateHomeRequest params) {
		return privateHomeRepository.getSalesByWriterId(id, params);
	}

	public PrivateHomePostLikeResponse getPostLikeListByMemberId(Long id, PrivateHomeRequest params) {
		return privateHomeRepository.getPostLikeListByMemberId(id, params);
	}

	public PrivateHomeSaleLikeResponse getSaleLikeListByMemberId(Long memberId, PrivateHomeRequest params) {
		return privateHomeRepository.getSaleLikeByMemberId(memberId, params);
	}
}

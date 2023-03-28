package com.hobbyt.domain.privatehome.service;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.follow.repository.FollowRepository;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.privatehome.dto.request.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.request.ProfileRequest;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleResponse;
import com.hobbyt.domain.privatehome.dto.response.ProfileResponse;
import com.hobbyt.domain.privatehome.entity.Visit;
import com.hobbyt.domain.privatehome.repository.VisitRepository;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PrivateHomeService {
	private final MemberRepository memberRepository;
	private final MemberService memberService;
	private final VisitRepository visitRepository;
	private final FollowRepository followRepository;

	@Transactional
	@Scheduled(cron = "0 0 0 * * *")
	public void initVisit() {
		memberRepository.updateTodayViews();
		visitRepository.deleteVisitBeforeToday();
	}

	@Transactional
	public void countVisitor(Long targetId, String visitorEmail) {
		Member visitor = memberService.findMemberByEmail(visitorEmail);
		Member target = memberService.findMemberById(targetId);

		if (canIncreaseVisitingNumber(visitor, target)) {
			target.increaseVisitors();
			Visit visit = new Visit(visitor, target);
			visitRepository.save(visit);
		}
	}

	@Transactional
	public ProfileResponse getProfile(final Long targetMemberId, MemberDetails loginMember) {
		Member targetMember = memberService.findMemberById(targetMemberId);
		ProfileResponse profileResponse = null;

		if (loginMember == null) {
			profileResponse = ProfileResponse.of(targetMember);
			return profileResponse;
		}

		String email = loginMember.getEmail();
		countVisitor(targetMemberId, email);
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
			List<Long> myFollowingId = followRepository.findFollowingIdByMember(myInfo);
			return myFollowingId.contains(targetMemberId);
		}

		return null;
	}

	private boolean canIncreaseVisitingNumber(Member visitor, Member target) {
		return isDifferentMember(visitor, target) && isNotVisitExist(visitor, target);
	}

	private boolean isDifferentMember(Member visitor, Member target) {
		return !visitor.equals(target);
	}

	private boolean isNotVisitExist(Member visitor, Member target) {
		return !visitRepository.findTodayVisitByVisitorAndTarget(visitor, target).isPresent();
	}

	@Transactional
	public PrivateHomePostResponse getBlogListByMemberId(Long memberId, PrivateHomeRequest params) {
		return memberRepository.getBlogListByWriterId(memberId, params);
	}

	public PrivateHomeCommentResponse getCommentListByMemberId(Long id, PrivateHomeRequest params) {
		return memberRepository.getCommentListByWriterId(id, params);
	}

	public PrivateHomeSaleResponse getSales(Long id, PrivateHomeRequest params) {
		return memberRepository.getSalesByWriterId(id, params);
	}

	public PrivateHomePostLikeResponse getPostLikeListByMemberId(Long id, PrivateHomeRequest params) {
		return memberRepository.getPostLikeListByMemberId(id, params);
	}

	public PrivateHomeSaleLikeResponse getSaleLikeListByMemberId(Long memberId, PrivateHomeRequest params) {
		return memberRepository.getSaleLikeByMemberId(memberId, params);
	}
}

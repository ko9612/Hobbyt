package com.hobbyt.domain.privatehome.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleResponse;
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

	@Transactional
	public void countVisitor(Long targetId, String visitorEmail) {
		// TODO 배치, 스케줄러 이용하여 매일 0시에 오늘날짜 이전의 visit 데이터 삭제
		Member visitor = memberService.findMemberByEmail(visitorEmail);
		Member target = memberService.findMemberById(targetId);

		if (canIncreaseVisitingNumber(visitor, target)) {
			target.increaseVisitors();
			Visit visit = new Visit(visitor, target);
			visitRepository.save(visit);
		}
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
	public PrivateHomePostResponse getBlogListByMemberId(Long memberId, PrivateHomeRequest params,
		MemberDetails loginMember) {

		if (loginMember != null) {
			countVisitor(memberId, loginMember.getEmail());
		}

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

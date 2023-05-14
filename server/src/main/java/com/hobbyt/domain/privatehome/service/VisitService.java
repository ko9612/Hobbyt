package com.hobbyt.domain.privatehome.service;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.privatehome.entity.Visit;
import com.hobbyt.domain.privatehome.repository.PrivateHomeRepository;
import com.hobbyt.domain.privatehome.repository.VisitRepository;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VisitService {
	private final MemberService memberService;
	private final PrivateHomeRepository privateHomeRepository;
	private final VisitRepository visitRepository;
	private final MemberRepository memberRepository;

	@Scheduled(cron = "0 0 0 * * *")
	public void initVisit() {
		privateHomeRepository.updateTodayViews();
		visitRepository.deleteVisitBeforeToday();
	}

	public void countVisitor(Long targetId, String visitorEmail) {
		Member target = memberRepository.findMemberForUpdateById(targetId)
			.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
		Member visitor = memberService.findMemberByEmail(visitorEmail);
		// Member target = memberService.findMemberById(targetId);

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
}

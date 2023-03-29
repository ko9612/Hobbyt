package com.hobbyt.domain.member.service.query;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.dto.response.MyInfoResponse;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberQueryService {
	private final MemberService memberService;

	public MyInfoResponse getMyInfo(final String email) {
		Member member = memberService.findMemberByEmail(email);

		return MyInfoResponse.of(member);
	}
}

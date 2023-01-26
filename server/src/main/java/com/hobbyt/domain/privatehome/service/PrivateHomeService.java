package com.hobbyt.domain.privatehome.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PrivateHomeService {
	private final MemberRepository memberRepository;

	public PrivateHomePostResponse getBlogListByMemberId(Long id, PrivateHomeServiceDto.Get params) {
		return memberRepository.getBlogListByWriterId(id, params);
	}

	public PrivateHomeCommentResponse getCommentListByMemberId(Long id, PrivateHomeServiceDto.Get params) {
		return memberRepository.getCommentListByWriterId(id, params);
	}

	public PrivateHomeSaleResponse getSales(Long id, PrivateHomeRequest params) {
		return memberRepository.getSalesByWriterId(id, params);
	}
}

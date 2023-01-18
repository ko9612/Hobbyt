package com.hobbyt.domain.privatehome.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.repository.MemberRepository;
import com.hobbyt.domain.privatehome.dto.PrivateHomeBlogResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PrivateHomeService {
	private final MemberRepository memberRepository;

	public PrivateHomeBlogResponse getBlogListByMemberId(Long id, PrivateHomeServiceDto.Blog params) {
		return memberRepository.getBlogListByWriterId(id, params);
	}
}

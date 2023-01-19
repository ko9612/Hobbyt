package com.hobbyt.domain.member.repository;

import com.hobbyt.domain.privatehome.dto.PrivateHomeBlogResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;

public interface CustomMemberRepository {
	PrivateHomeBlogResponse getBlogListByWriterId(Long writerId, PrivateHomeServiceDto.Get params);

	PrivateHomeCommentResponse getCommentListByWriterId(Long writerId, PrivateHomeServiceDto.Get params);
}

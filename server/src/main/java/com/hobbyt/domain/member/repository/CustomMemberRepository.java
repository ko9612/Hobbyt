package com.hobbyt.domain.member.repository;

import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;

public interface CustomMemberRepository {
	PrivateHomePostResponse getBlogListByWriterId(Long writerId, PrivateHomeServiceDto params);

	PrivateHomeCommentResponse getCommentListByWriterId(Long writerId, PrivateHomeServiceDto params);
}

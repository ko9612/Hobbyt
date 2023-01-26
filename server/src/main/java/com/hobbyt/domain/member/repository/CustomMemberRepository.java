package com.hobbyt.domain.member.repository;

import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;

public interface CustomMemberRepository {
	PrivateHomePostResponse getBlogListByWriterId(Long writerId, PrivateHomeServiceDto.Get params);

	PrivateHomeCommentResponse getCommentListByWriterId(Long writerId, PrivateHomeServiceDto.Get params);

	PrivateHomeSaleResponse getSalesByWriterId(Long writerId, PrivateHomeRequest params);
}

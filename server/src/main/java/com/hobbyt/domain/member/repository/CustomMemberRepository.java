package com.hobbyt.domain.member.repository;

import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleResponse;

public interface CustomMemberRepository {
	PrivateHomePostResponse getBlogListByWriterId(Long writerId, PrivateHomeRequest params);

	PrivateHomeSaleResponse getSalesByWriterId(Long writerId, PrivateHomeRequest params);

	PrivateHomeCommentResponse getCommentListByWriterId(Long writerId, PrivateHomeRequest params);

	PrivateHomePostLikeResponse getPostLikeListByMemberId(Long memberId, PrivateHomeRequest params);
}

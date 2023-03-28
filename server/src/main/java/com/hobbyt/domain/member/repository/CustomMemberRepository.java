package com.hobbyt.domain.member.repository;

import com.hobbyt.domain.privatehome.dto.request.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleLikeResponse;
import com.hobbyt.domain.privatehome.dto.response.PrivateHomeSaleResponse;

public interface CustomMemberRepository {
	PrivateHomePostResponse getBlogListByWriterId(Long writerId, PrivateHomeRequest params);

	PrivateHomeSaleResponse getSalesByWriterId(Long writerId, PrivateHomeRequest params);

	PrivateHomeCommentResponse getCommentListByWriterId(Long writerId, PrivateHomeRequest params);

	PrivateHomePostLikeResponse getPostLikeListByMemberId(Long memberId, PrivateHomeRequest params);

	PrivateHomeSaleLikeResponse getSaleLikeByMemberId(Long memberId, PrivateHomeRequest params);

	Long updateTodayViews();
}

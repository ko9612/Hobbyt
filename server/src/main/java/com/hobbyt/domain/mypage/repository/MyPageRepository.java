package com.hobbyt.domain.mypage.repository;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.mypage.dto.PageDto;
import com.hobbyt.domain.mypage.dto.response.OrderDetails;

public interface MyPageRepository {
	PageDto getOrderedProductsByMemberEmail(String email, Pageable pageable);

	OrderDetails findOrderDetailsByOrderId(Long orderId);

	PageDto findMyOrdersByEmail(String email, Pageable pageable);

	PageDto findOrdersByEmail(String email, Pageable pageable);
}

package com.hobbyt.domain.order.repository;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.mypage.dto.OrderDetails;
import com.hobbyt.domain.mypage.dto.PageDto;

public interface CustomOrderRepository {
	OrderDetails findOrderDetailsByOrderId(Long orderId);

	PageDto findMyOrdersByEmail(String email, Pageable pageable);

	PageDto findOrdersByEmail(String email, Pageable pageable);
}

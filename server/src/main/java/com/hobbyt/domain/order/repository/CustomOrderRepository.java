package com.hobbyt.domain.order.repository;

import com.hobbyt.domain.mypage.dto.OrderDetails;

public interface CustomOrderRepository {
	OrderDetails findOrderDetailsByOrderId(Long orderId);
}

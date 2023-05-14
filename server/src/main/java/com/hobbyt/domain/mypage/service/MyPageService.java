package com.hobbyt.domain.mypage.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.OrderStatus;
import com.hobbyt.domain.order.service.OrderService;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Address;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MyPageService {
	private final OrderService orderService;

	public Long updateOrderStatus(Long orderId, OrderStatus status) {
		Order order = orderService.findOrderByOrderId(orderId);
		order.updateOrderStatus(status);
		return order.getId();
	}

	public Long updateOrderDetails(Long orderId, Address address, Account refundAccount) {
		Order order = orderService.findOrderByOrderId(orderId);
		order.updateRecipientAddress(address);
		order.updateRefundAccount(refundAccount);
		return order.getId();
	}
}

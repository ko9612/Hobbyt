package com.hobbyt.domain.mypage.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.mypage.dto.OrderDetails;
import com.hobbyt.domain.mypage.dto.OrderedProductsResponse;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.OrderStatus;
import com.hobbyt.domain.order.repository.OrderRepository;
import com.hobbyt.domain.order.service.OrderService;
import com.hobbyt.domain.sale.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPageService {
	private final MemberService memberService;
	private final OrderService orderService;
	private final ProductRepository productRepository;
	private final OrderRepository orderRepository;

	public OrderedProductsResponse getOrderedProducts(String email) {
		Member member = memberService.findMemberByEmail(email);

		return null;
	}

	@Transactional
	public Long updateOrderStatus(Long orderId, OrderStatus status) {
		Order order = orderService.findOrderByOrderId(orderId);
		order.updateOrderStatus(status);
		return order.getId();
	}

	public OrderDetails getOrderDetails(Long orderId) {
		OrderDetails orderDetails = orderRepository.findOrderDetailsByOrderId(orderId);
		return orderDetails;
	}
}

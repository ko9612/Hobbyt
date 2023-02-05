package com.hobbyt.domain.mypage.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.member.service.MemberService;
import com.hobbyt.domain.mypage.dto.OrderDetails;
import com.hobbyt.domain.mypage.dto.OrderedProductInfo;
import com.hobbyt.domain.mypage.dto.PageDto;
import com.hobbyt.domain.mypage.dto.PageResponse;
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

	public PageResponse getOrderedProducts(String email, Pageable pageable) {
		PageDto pageDto = productRepository.getOrderedProductsByMemberEmail(email, pageable);

		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());

		return PageResponse.of(page);
	}

	@Transactional
	public Long updateOrderStatus(Long orderId, OrderStatus status) {
		Order order = orderService.findOrderByOrderId(orderId);
		order.updateOrderStatus(status);
		return order.getId();
	}

	public OrderDetails getOrderDetails(Long orderId, String email) {
		OrderDetails orderDetails = orderRepository.findOrderDetailsByOrderId(orderId, email);
		return orderDetails;
	}

	public PageResponse getOrders(String email, Pageable pageable) {
		PageDto pageDto = orderRepository.findOrdersByEmail(email, pageable);
		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());
		return PageResponse.of(page);
	}
}

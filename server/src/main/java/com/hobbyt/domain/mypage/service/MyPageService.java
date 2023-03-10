package com.hobbyt.domain.mypage.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.mypage.dto.OrderedProductInfo;
import com.hobbyt.domain.mypage.dto.PageDto;
import com.hobbyt.domain.mypage.dto.response.OrderDetails;
import com.hobbyt.domain.mypage.dto.response.PageResponse;
import com.hobbyt.domain.mypage.repository.MyPageRepository;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.OrderStatus;
import com.hobbyt.domain.order.service.OrderService;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Address;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPageService {
	private final OrderService orderService;
	private final MyPageRepository myPageRepository;

	public PageResponse getOrderedProducts(String email, Pageable pageable) {
		PageDto pageDto = myPageRepository.getOrderedProductsByMemberEmail(email, pageable);

		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());

		return PageResponse.of(page);
	}

	@Transactional
	public Long updateOrderStatus(Long orderId, OrderStatus status) {
		Order order = orderService.findOrderByOrderId(orderId);
		order.updateOrderStatus(status);
		return order.getId();
	}

	public OrderDetails getOrderDetails(Long orderId) {
		OrderDetails orderDetails = myPageRepository.findOrderDetailsByOrderId(orderId);
		return orderDetails;
	}

	// 내가한 주문 TODO test
	public PageResponse getMyOrders(String email, Pageable pageable) {
		PageDto pageDto = myPageRepository.findMyOrdersByEmail(email, pageable);
		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());
		return PageResponse.of(page);
	}

	// 내가 올린 판매글에 대한 주문
	public PageResponse getOrders(String email, Pageable pageable) {
		PageDto pageDto = myPageRepository.findOrdersByEmail(email, pageable);
		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());
		return PageResponse.of(page);
	}

	@Transactional
	public Long updateOrderDetails(Long orderId, Address address, Account refundAccount) {
		Order order = orderService.findOrderByOrderId(orderId);
		order.updateRecipientAddress(address);
		order.updateRefundAccount(refundAccount);
		return order.getId();
	}
}

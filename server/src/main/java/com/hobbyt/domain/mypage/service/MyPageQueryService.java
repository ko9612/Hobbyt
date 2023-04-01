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
import com.hobbyt.domain.order.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPageQueryService {
	private final OrderService orderService;
	private final MyPageRepository myPageRepository;

	public PageResponse getOrderedProducts(String email, Pageable pageable) {
		PageDto pageDto = myPageRepository.getOrderedProductsByMemberEmail(email, pageable);

		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());

		return PageResponse.of(page);
	}

	public OrderDetails getOrderDetails(Long orderId) {
		OrderDetails orderDetails = myPageRepository.findOrderDetailsByOrderId(orderId);
		return orderDetails;
	}

	public PageResponse getMyOrders(String email, Pageable pageable) {
		PageDto pageDto = myPageRepository.findMyOrdersByEmail(email, pageable);
		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());
		return PageResponse.of(page);
	}

	public PageResponse getOrders(String email, Pageable pageable) {
		PageDto pageDto = myPageRepository.findOrdersByEmail(email, pageable);
		Page<OrderedProductInfo> page = new PageImpl<>(pageDto.getContent(), pageable, pageDto.getTotal());
		return PageResponse.of(page);
	}
}

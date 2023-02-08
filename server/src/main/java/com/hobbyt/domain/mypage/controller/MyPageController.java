package com.hobbyt.domain.mypage.controller;

import javax.validation.constraints.Min;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.mypage.dto.OrderDetails;
import com.hobbyt.domain.mypage.dto.PageResponse;
import com.hobbyt.domain.mypage.dto.UpdateOrderStatusRequest;
import com.hobbyt.domain.mypage.service.MyPageService;
import com.hobbyt.domain.order.dto.UpdateOrderDetailsRequest;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members/myPage")
@RequiredArgsConstructor
public class MyPageController {
	private final MyPageService myPageService;

	@GetMapping("/products")
	public ResponseEntity getOrderedProducts(@AuthenticationPrincipal MemberDetails loginMember, Pageable pageable) {

		PageResponse response = myPageService.getOrderedProducts(loginMember.getEmail(), pageable);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/products/management")
	public ResponseEntity getOrders(@AuthenticationPrincipal MemberDetails loginMember, Pageable pageable) {

		PageResponse response = myPageService.getOrders(loginMember.getEmail(), pageable);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/orders")
	public ResponseEntity getMyOrders(@AuthenticationPrincipal MemberDetails loginMember, Pageable pageable) {

		PageResponse response = myPageService.getMyOrders(loginMember.getEmail(), pageable);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/orders/{orderId}")
	public ResponseEntity getOrderDetails(@Min(value = 1) @PathVariable Long orderId) {
		OrderDetails response = myPageService.getOrderDetails(orderId);
		return ResponseEntity.ok(response);
	}

	@PatchMapping("/orders/{orderId}")
	public ResponseEntity updateOrderDetails(@Min(value = 1) @PathVariable Long orderId,
		@RequestBody UpdateOrderDetailsRequest request) {
		myPageService.updateOrderDetails(orderId, request.getAddress(), request.getRefundAccount());
		return ResponseEntity.ok().build();
	}

	@PatchMapping("/orders/{orderId}/status")
	public ResponseEntity updateOrderStatus(@Min(value = 1) @PathVariable Long orderId,
		@RequestBody UpdateOrderStatusRequest request) {
		myPageService.updateOrderStatus(orderId, request.getStatus());
		return ResponseEntity.ok().build();
	}
}
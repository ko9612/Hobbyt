package com.hobbyt.domain.order.controller;

import java.io.IOException;

import javax.validation.constraints.Min;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.order.dto.request.OrderImportRequest;
import com.hobbyt.domain.order.dto.request.OrderInfo;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.service.OrderService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
	private final OrderService orderService;

	@PostMapping("/payment/complete")
	public ResponseEntity order(@AuthenticationPrincipal MemberDetails loginMember,
		@Validated @RequestBody OrderImportRequest request) throws IOException {

		Long orderId = orderService.compareTotalPrice(request, loginMember.getEmail());
		return ResponseEntity.ok(orderId);
	}

	@PostMapping
	public ResponseEntity order(@AuthenticationPrincipal MemberDetails loginMember,
		@Validated @RequestBody OrderInfo request) {

		Order order = orderService.order(loginMember.getEmail(), request);
		return ResponseEntity.ok(order.getId());
	}

	@DeleteMapping("/{orderId}")
	public ResponseEntity cancel(@Min(value = 1) @PathVariable Long orderId) throws IOException {
		orderService.cancel(orderId);
		return ResponseEntity.ok().build();
	}
}

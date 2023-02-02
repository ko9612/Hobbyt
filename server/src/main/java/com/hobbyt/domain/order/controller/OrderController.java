package com.hobbyt.domain.order.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hobbyt.domain.order.dto.OrderImportRequest;
import com.hobbyt.domain.order.dto.OrderInfo;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.service.OrderService;
import com.hobbyt.domain.order.service.PaymentService;
import com.hobbyt.global.security.member.MemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

	private final PaymentService paymentService;
	private final OrderService orderService;

	@PostMapping("/payment/complete")
	public ResponseEntity order(@AuthenticationPrincipal MemberDetails loginMember,
		@RequestBody OrderImportRequest request)
		throws IOException {

		String token = paymentService.getToken();
		int amount = paymentService.paymentInfo(request.getImpUid(), token);

		try {
			int totalPrice = orderService.getTotalPrice(request.getOrderInfo());

			if (amount != totalPrice) {
				paymentService.paymentCancel(token, request.getImpUid(), amount, "결제 금액 오류");
				return ResponseEntity.badRequest().body("결제 금액 오류, 결제 취소");
			}

			// DB에 주문 저장
			Long orderId = orderService.orderByImport(loginMember.getEmail(), request, amount);

			return ResponseEntity.ok(orderId);
		} catch (Exception ex) {
			paymentService.paymentCancel(token, request.getImpUid(), amount, "결제 에러");
			return ResponseEntity.badRequest().body("결제 에러");
		}
	}

	@PostMapping
	public ResponseEntity order(@AuthenticationPrincipal MemberDetails loginMember, @RequestBody OrderInfo request) {
		// Order order = orderService.order(loginMember.getEmail(), request.toOrder(), request.getProducts());
		Order order = orderService.order(loginMember.getEmail(), request);
		return ResponseEntity.ok(order.getId());
	}
}

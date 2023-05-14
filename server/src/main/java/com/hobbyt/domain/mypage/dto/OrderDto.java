package com.hobbyt.domain.mypage.dto;

import static com.hobbyt.domain.order.entity.OrderStatus.*;

import java.time.LocalDateTime;

import com.hobbyt.domain.order.entity.OrderStatus;

import lombok.Getter;

@Getter
public class OrderDto {
	private Long orderId;
	private String title;
	private String nickname;
	private LocalDateTime createdAt;
	private OrderStatus status;
	private String orderNumber;
	private Long sellerId;
	private Boolean isCanceled;

	public OrderDto(Long orderId, String title, String nickname, LocalDateTime createdAt,
		OrderStatus status, String orderNumber, Long sellerId) {
		this.orderId = orderId;
		this.title = title;
		this.nickname = nickname;
		this.createdAt = createdAt;
		this.status = status;
		this.orderNumber = orderNumber;
		this.sellerId = sellerId;
		this.isCanceled =
			status == PREPARE_REFUND
				|| status == FINISH_REFUND
				|| status == CANCEL;
	}
}

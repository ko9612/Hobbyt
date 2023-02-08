package com.hobbyt.domain.mypage.dto;

import java.time.LocalDateTime;

import com.hobbyt.domain.order.entity.OrderStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyOrderDto {
	private Long orderId;
	private String title;
	private String nickname;
	private LocalDateTime createdAt;
	private OrderStatus status;
}

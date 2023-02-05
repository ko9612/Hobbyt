package com.hobbyt.domain.mypage.dto;

import com.hobbyt.domain.order.entity.OrderStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateOrderStatusRequest {
	private OrderStatus status;
}

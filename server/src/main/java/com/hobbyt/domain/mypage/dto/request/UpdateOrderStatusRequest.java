package com.hobbyt.domain.mypage.dto.request;

import javax.validation.constraints.NotNull;

import com.hobbyt.domain.order.entity.OrderStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateOrderStatusRequest {
	@NotNull
	private OrderStatus status;
}

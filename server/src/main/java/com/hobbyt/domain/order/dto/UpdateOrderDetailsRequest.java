package com.hobbyt.domain.order.dto;

import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Address;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateOrderDetailsRequest {
	private Address address;
	private Account refundAccount;
}

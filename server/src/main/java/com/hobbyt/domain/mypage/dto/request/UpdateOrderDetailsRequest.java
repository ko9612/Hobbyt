package com.hobbyt.domain.mypage.dto.request;

import javax.validation.constraints.NotNull;

import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Address;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateOrderDetailsRequest {
	@NotNull
	private Address address;
	@NotNull
	private Account refundAccount;
}

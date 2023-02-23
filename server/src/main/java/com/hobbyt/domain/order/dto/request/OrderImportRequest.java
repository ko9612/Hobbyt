package com.hobbyt.domain.order.dto.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderImportRequest {
	@NotBlank(message = "아임포트 결제번호를 입력해주세요.")
	private String impUid;    // 아임포트 결제번호
	@NotBlank(message = "주문 정보를 입력해주세요.")
	private OrderInfo orderInfo;    // 주문관련 정보
}

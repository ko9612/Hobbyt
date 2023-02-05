package com.hobbyt.domain.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderImportRequest {
	private String impUid;    // 아임포트 결제번호
	private OrderInfo orderInfo;    // 주문관련 정보
}

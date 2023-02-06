package com.hobbyt.domain.order.entity;

public enum OrderStatus {
	ORDER("주문완료"), PAYMENT_VERIFICATION("입금확인"),
	PREPARE_DELIVERY("배송준비중"), START_DELIVERY("배송시작"), FINISH_DELIVERY("배송완료"),
	PREPARE_REFUND("환불준비중"), FINISH_REFUND("환불완료"), FINISH("거래종료");

	private String name;

	OrderStatus(String name) {
		this.name = name;
	}
}

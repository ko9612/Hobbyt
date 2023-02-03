package com.hobbyt.domain.order.entity;

public enum OrderStatus {
	CANCEL("주문취소"), ORDER("주문완료"), PAYMENT_VERIFICATION("입금확인"),
	PREPARING("배송준비중"), SHIPPING("배송시작"), FINISH("거래종료");

	private String name;

	OrderStatus(String name) {
		this.name = name;
	}
}

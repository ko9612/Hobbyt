package com.hobbyt.domain.order.dto;

import java.util.List;

import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.PaymentMethod;
import com.hobbyt.global.entity.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderInfo {
	private String orderNumber;    // 주문 번호
	private Long saleId;
	// 입금자 이름
	private String depositor;

	// 배송정보
	// 수령자 이름, 폰번호, 주소
	private Recipient recipient;

	// 환불 계좌 정보
	// 이름, 계좌번호, 은행
	private Account refundAccount;

	// 개인정보 수집 및 동의
	private Boolean checkPrivacyPolicy;

	// 결제 수단
	private PaymentMethod paymentMethod;

	private List<ProductDto> products;

	public Order toOrder() {
		return Order.of(orderNumber, depositor, recipient, refundAccount, checkPrivacyPolicy, paymentMethod);
	}
}

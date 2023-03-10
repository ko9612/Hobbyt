package com.hobbyt.domain.order.dto.request;

import java.util.List;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.PayMethod;
import com.hobbyt.global.entity.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderInfo {
	@NotBlank(message = "주문번호를 입력해주세요.")
	private String orderNumber;    // 주문 번호
	@NotNull
	private Long saleId;
	@NotBlank(message = "입금자 이름을 입력해주세요.")
	private String depositor;

	// 배송정보
	// 수령자 이름, 폰번호, 주소
	@NotNull
	private Recipient recipient;

	// 환불 계좌 정보
	// 이름, 계좌번호, 은행
	private Account refundAccount;

	// 개인정보 수집 및 동의
	@AssertTrue
	private Boolean checkPrivacyPolicy;

	// 결제 수단
	@NotNull
	private PayMethod payMethod;
	@NotNull
	private List<ProductDto> products;

	public Order toOrder() {
		return Order.of(orderNumber, depositor, recipient, refundAccount, checkPrivacyPolicy, payMethod);
	}
}

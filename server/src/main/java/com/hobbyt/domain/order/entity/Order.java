package com.hobbyt.domain.order.entity;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Address;
import com.hobbyt.global.entity.BaseEntity;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@Column(nullable = false, updatable = false, unique = true)
	private String orderNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;    // 주문자

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private OrderStatus status;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> orderItems = new ArrayList<>();

	// 입금자 이름
	private String depositor;

	// 배송정보
	// 수령자 이름, 폰번호, 주소
	@Embedded
	private Recipient recipient;

	// 환불 계좌 정보
	// 이름, 계좌번호, 은행
	@Embedded
	private Account refundAccount;

	// 개인정보 수집 및 동의
	private boolean checkPrivacyPolicy;

	// 결제 수단
	@Enumerated(EnumType.STRING)
	private PayMethod payMethod;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "payments_id")
	private Payments payments;

	@Builder
	private Order(String orderNumber, String depositor, Recipient recipient,
		Account refundAccount, boolean checkPrivacyPolicy, PayMethod payMethod) {
		this.orderNumber = orderNumber;
		this.depositor = depositor;
		this.recipient = recipient;
		this.refundAccount = refundAccount;
		this.checkPrivacyPolicy = checkPrivacyPolicy;
		this.payMethod = payMethod;
	}

	public static Order of(String orderNumber, String depositor, Recipient recipient,
		Account refundAccount, boolean checkPrivacyPolicy, PayMethod payMethod) {

		return Order.builder()
			.orderNumber(orderNumber)
			.depositor(depositor)
			.recipient(recipient)
			.refundAccount(refundAccount)
			.checkPrivacyPolicy(checkPrivacyPolicy)
			.payMethod(payMethod)
			.build();
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public void updateOrderStatus(OrderStatus status) {
		this.status = status;
	}

	public void addOrderItem(OrderItem orderItem) {
		this.orderItems.add(orderItem);
		orderItem.setOrder(this);
	}

	public void setPayments(Payments payments) {
		this.payments = payments;
	}

	public boolean isPossibleStatusToCancel() {
		return this.status == OrderStatus.ORDER;
	}

	public boolean isPossibleStatusToRefund() {
		return this.status == OrderStatus.PAYMENT_VERIFICATION
			|| this.status == OrderStatus.START_DELIVERY
			|| this.status == OrderStatus.PREPARE_DELIVERY
			|| this.status == OrderStatus.FINISH_DELIVERY;
	}

	public boolean isBankTransfer() {
		return this.payMethod == PayMethod.BANK_TRANSFER;
	}

	public void cancel() {
		if (!isPossibleStatusToCancel() && !isPossibleStatusToRefund()) {
			throw new BusinessLogicException(ORDER_CANCEL_NOT_PERMITTED, "Current Order Status:" + status.name());
		}

		for (OrderItem orderItem : orderItems) {
			orderItem.cancel();
		}
	}

	public int getTotalProductPrice() {
		return orderItems.stream()
			.mapToInt(OrderItem::getTotalPrice)
			.sum();
	}

	public void updateRecipientAddress(Address address) {
		this.recipient.updateAddress(address);
	}

	public void updateRefundAccount(Account refundAccount) {
		this.refundAccount = refundAccount == null ? this.refundAccount : refundAccount;
	}
}

package com.hobbyt.domain.order.entity;

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
import com.hobbyt.global.entity.BaseEntity;

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
	private OrderStatus orderStatus;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	List<OrderItem> orderItems = new ArrayList<>();

	// 입금자 이름
	private String depositor;

	// 주문자 정보
	// 이름, 핸드폰 번호, 이메일
	@Embedded
	private OrdererInfo ordererInfo;

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
	private PaymentMethod paymentMethod;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payments_id")
	private Payments payments;

	@Builder
	private Order(String orderNumber, String depositor, OrdererInfo ordererInfo, Recipient recipient,
		Account refundAccount, boolean checkPrivacyPolicy, PaymentMethod paymentMethod) {
		this.orderNumber = orderNumber;
		this.depositor = depositor;
		this.ordererInfo = ordererInfo;
		this.recipient = recipient;
		this.refundAccount = refundAccount;
		this.checkPrivacyPolicy = checkPrivacyPolicy;
		this.paymentMethod = paymentMethod;
	}

	public static Order of(String orderNumber, String depositor, OrdererInfo ordererInfo, Recipient recipient,
		Account refundAccount, boolean checkPrivacyPolicy, PaymentMethod paymentMethod) {

		return Order.builder()
			.orderNumber(orderNumber)
			.depositor(depositor)
			.ordererInfo(ordererInfo)
			.recipient(recipient)
			.refundAccount(refundAccount)
			.checkPrivacyPolicy(checkPrivacyPolicy)
			.paymentMethod(paymentMethod)
			.build();
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public void updateOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public void addOrderItem(OrderItem orderItem) {
		this.orderItems.add(orderItem);
	}

	public void setPayments(Payments payments) {
		this.payments = payments;
	}
}

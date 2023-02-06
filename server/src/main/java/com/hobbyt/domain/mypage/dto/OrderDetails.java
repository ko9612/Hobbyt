package com.hobbyt.domain.mypage.dto;

import java.util.ArrayList;
import java.util.List;

import com.hobbyt.domain.member.entity.Recipient;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.domain.order.entity.OrderItem;
import com.hobbyt.domain.order.entity.OrderStatus;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.global.entity.Account;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class OrderDetails {
	private String orderNumber;
	private OrderStatus status;    // 주문상태
	private String thumbnailImage;    // 판매 게시글 썸네일
	private String depositor;    // 입금자 이름
	private Account sellerAccount;    // 판매자 계좌
	private String name;    // 주문자 닉네임
	private String phoneNumber;    // 주문자 연락처
	private String email;    // 주문자 이메일
	private Recipient recipient;    // 받는 사람 이름, 폰번호, 주소
	private Account refundAccount;    // 환불계좌
	private List<ProductDto> products = new ArrayList<>();
	private int totalProductPrice;    // 상품 총 금액
	private int deliveryPrice;    // 배송비
	private int totalPrice;        // 총 주문액

	@Getter
	@NoArgsConstructor
	private static class ProductDto {
		private String name;
		private int price;
		private int count;

		public ProductDto(OrderItem orderItem) {
			Product product = orderItem.getProduct();
			this.name = product.getName();
			this.price = product.getPrice();
			this.count = orderItem.getCount();
		}
	}

	@Builder
	public OrderDetails(Order order, String thumbnailImage, String email, Account sellerAccount, int deliveryPrice) {

		this.orderNumber = order.getOrderNumber();
		this.status = order.getStatus();
		this.thumbnailImage = thumbnailImage;
		this.depositor = order.getDepositor();
		this.sellerAccount = sellerAccount == null ? new Account() : sellerAccount;
		Recipient recipient = order.getRecipient();
		this.name = recipient == null ? null : recipient.getName();
		this.phoneNumber = recipient == null ? null : recipient.getPhoneNumber();
		this.email = email;
		this.recipient = recipient == null ? new Recipient() : recipient;
		this.refundAccount = order.getRefundAccount() == null ? new Account() : order.getRefundAccount();

		for (OrderItem orderItem : order.getOrderItems()) {
			this.products.add(new ProductDto(orderItem));
		}
		this.totalProductPrice = order.getTotalProductPrice();
		this.deliveryPrice = deliveryPrice;
		this.totalPrice = totalProductPrice + deliveryPrice;
	}
}

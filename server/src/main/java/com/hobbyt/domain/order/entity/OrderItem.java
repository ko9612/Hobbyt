package com.hobbyt.domain.order.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hobbyt.domain.sale.entity.Product;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@Column(nullable = false)
	private int orderPrice;    // 상품 가격

	@Column(nullable = false)
	private int count;    // 해당 상품 구매수량

	private OrderItem(Product product, int orderPrice, int count) {
		this.product = product;
		this.orderPrice = orderPrice;
		this.count = count;
	}

	public static OrderItem of(Product product, int orderPrice, int count) {
		OrderItem orderItem = new OrderItem(product, orderPrice, count);
		product.removeStock(count);
		return orderItem;
	}

	public int getTotalPrice() {
		return orderPrice * count;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public void cancel() {
		product.addStock(count);
	}
}

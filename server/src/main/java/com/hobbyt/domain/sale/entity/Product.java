package com.hobbyt.domain.sale.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hobbyt.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sale_id", nullable = false)
	private Sale sale;

	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String imageUrl;
	@Column(nullable = false)
	private int price;
	@Column(nullable = false)
	private int stockQuantity;

	@Builder
	private Product(Sale sale, String name, int price, int stockQuantity) {
		this.sale = sale;
		this.name = name;
		this.price = price;
		this.stockQuantity = stockQuantity;
	}

	public static Product of(Sale sale, String name, int price, int stockQuantity) {
		return Product.builder()
			.sale(sale)
			.name(name)
			.price(price)
			.stockQuantity(stockQuantity)
			.build();
	}

	public static Product of(String name, int price, int stockQuantity) {
		return Product.builder()
			.name(name)
			.price(price)
			.stockQuantity(stockQuantity)
			.build();
	}

	public void updateImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setSale(Sale sale) {
		this.sale = sale == null ? this.sale : sale;
	}
}

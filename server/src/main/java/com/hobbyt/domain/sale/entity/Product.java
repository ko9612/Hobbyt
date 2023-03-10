package com.hobbyt.domain.sale.entity;

import static com.hobbyt.global.error.exception.ExceptionCode.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hobbyt.global.entity.BaseEntity;
import com.hobbyt.global.error.exception.BusinessLogicException;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
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

	// 누적 판매량
	private int salesVolume = 0;

	private boolean isDeleted = false;

	@Builder
	private Product(Long id, String name, int price, int stockQuantity, String imageUrl) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.stockQuantity = stockQuantity;
		this.imageUrl = imageUrl;
	}

	public static Product of(Long id, String name, int price, int stockQuantity) {
		return Product.builder()
			.id(id)
			.name(name)
			.price(price)
			.stockQuantity(stockQuantity)
			.build();
	}

	public static Product of(String name, int price, int stockQuantity, String imageUrl) {
		return Product.builder()
			.name(name)
			.price(price)
			.stockQuantity(stockQuantity)
			.imageUrl(imageUrl)
			.build();
	}

	public void updateImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setSale(Sale sale) {
		this.sale = sale == null ? this.sale : sale;
	}

	public void update(Product product) {
		this.name = product.name;
		this.imageUrl = product.imageUrl;
		this.price = product.price;
		this.stockQuantity = product.stockQuantity;
	}

	public void delete() {
		this.isDeleted = true;
	}

	public void removeStock(int quantity) {
		int restStock = this.stockQuantity - quantity;
		if (restStock < 0) {
			throw new BusinessLogicException(PRODUCT_STOCK_NOT_ENOUGH);
		}
		this.salesVolume += quantity;
		this.stockQuantity = restStock;
	}

	public void addStock(int quantity) {
		this.stockQuantity += quantity;
		this.salesVolume -= quantity;
	}
}

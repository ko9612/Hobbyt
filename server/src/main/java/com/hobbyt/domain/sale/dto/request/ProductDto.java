package com.hobbyt.domain.sale.dto.request;

import com.hobbyt.domain.sale.entity.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductDto {
	private String name;
	private int price;
	private int stockQuantity;
	private String image;

	public Product toEntity() {
		return Product.of(name, price, stockQuantity, image);
	}
}

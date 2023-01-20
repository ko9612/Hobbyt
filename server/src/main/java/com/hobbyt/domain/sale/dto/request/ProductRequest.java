package com.hobbyt.domain.sale.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductRequest {
	private String name;
	private int price;
	private int stockQuantity;

	/*public Product toProduct() {
		return Product.of(name, price, stockQuantity);
	}*/
}

package com.hobbyt.domain.sale.dto.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.hobbyt.domain.sale.entity.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductDto {
	@NotBlank
	private String name;
	@NotNull
	@Min(100)
	private Integer price;
	@NotNull
	@Min(1)
	private Integer stockQuantity;
	@NotBlank
	private String image;

	public Product toEntity() {
		return Product.of(name, price, stockQuantity, image);
	}
}

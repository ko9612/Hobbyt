package com.hobbyt.domain.sale.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDto {
	private String name;
	private int price;
	private int stockQuantity;
	private MultipartFile image;
}

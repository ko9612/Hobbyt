package com.hobbyt.domain.order.dto.request;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductDto {
	@NotNull
	private Long id;
	@NotNull
	private Integer count;
}

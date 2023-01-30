package com.hobbyt.domain.main.dto;

import com.hobbyt.global.entity.OrderBy;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaleRequest {
	private int count;
	private OrderBy orderBy;
}

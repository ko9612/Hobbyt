package com.hobbyt.domain.mypage.dto;

import java.time.LocalDateTime;

import com.hobbyt.domain.sale.entity.Period;

public class OrderedProductDto {
	private Long saleId;
	private String productName;
	private Period period;
	private Boolean isAlwaysOnSale;
	private Boolean isDeleted;
	private int salesVolume;
	private LocalDateTime createdAt;
}

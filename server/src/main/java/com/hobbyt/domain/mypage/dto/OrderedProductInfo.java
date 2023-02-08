package com.hobbyt.domain.mypage.dto;

import java.time.LocalDateTime;

import com.hobbyt.domain.sale.entity.Period;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderedProductInfo {
	private Long saleId;
	private Long sellerId;
	private String productName;
	private Period period;
	private Boolean isAlwaysOnSale;
	private Boolean isDeleted;
	private int salesVolume;
	private LocalDateTime createdAt;

	public OrderedProductInfo(Long saleId, Long sellerId, String productName, Period period, Boolean isAlwaysOnSale,
		Boolean isDeleted, int salesVolume, LocalDateTime createdAt) {

		this.saleId = saleId;
		this.sellerId = sellerId;
		this.productName = productName;
		this.period = period == null ? new Period() : period;
		this.isAlwaysOnSale = isAlwaysOnSale;
		this.isDeleted = isDeleted;
		this.salesVolume = salesVolume;
		this.createdAt = createdAt;
	}
}

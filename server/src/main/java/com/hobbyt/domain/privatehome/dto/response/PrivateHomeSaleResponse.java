package com.hobbyt.domain.privatehome.dto.response;

import java.util.List;

import com.hobbyt.domain.privatehome.dto.SaleCard;

import lombok.Getter;

@Getter
public class PrivateHomeSaleResponse {
	private List<SaleCard> sales;
	private Boolean hasNext;

	private PrivateHomeSaleResponse(List<SaleCard> sales, Boolean hasNext) {
		this.sales = sales;
		this.hasNext = hasNext;
	}

	public static PrivateHomeSaleResponse of(List<SaleCard> sales, Boolean hasNext) {
		return new PrivateHomeSaleResponse(sales, hasNext);
	}
}

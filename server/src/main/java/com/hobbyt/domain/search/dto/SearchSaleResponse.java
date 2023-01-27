package com.hobbyt.domain.search.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class SearchSaleResponse {
	private List<SaleCard> sales;
	private Boolean hasNext;

	private SearchSaleResponse(List<SaleCard> sales, Boolean hasNext) {
		this.sales = sales;
		this.hasNext = hasNext;
	}

	public static SearchSaleResponse of(List<SaleCard> sales, Boolean hasNext) {
		return new SearchSaleResponse(sales, hasNext);
	}
}

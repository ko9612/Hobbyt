package com.hobbyt.domain.search.dto;

import com.querydsl.core.types.OrderSpecifier;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchRequest {
	private String keyWord;
	private int offset;
	private int limit;
	private OrderBy orderBy;

	public OrderSpecifier<?> getOrderBy() {
		return orderBy.getOrderSpecifier();
	}
}

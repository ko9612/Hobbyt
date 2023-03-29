package com.hobbyt.domain.privatehome.dto.request;

import com.hobbyt.global.entity.OrderBy;
import com.querydsl.core.types.OrderSpecifier;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PrivateHomeRequest {
	private long offset;
	private int limit;
	private OrderBy orderBy;

	public OrderSpecifier<?>[] getOrderBy() {
		return orderBy.getOrderSpecifiers();
	}
}

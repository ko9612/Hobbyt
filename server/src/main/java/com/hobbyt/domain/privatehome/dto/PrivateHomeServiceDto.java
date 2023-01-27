package com.hobbyt.domain.privatehome.dto;

import com.hobbyt.global.entity.OrderBy;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PrivateHomeServiceDto {

	private long offset;
	private int limit;
	private OrderBy orderBy;

	public static PrivateHomeServiceDto from(PrivateHomeRequest params) {
		return new PrivateHomeServiceDto(params.getOffset(), params.getLimit(), params.getOrderBy());
	}
}

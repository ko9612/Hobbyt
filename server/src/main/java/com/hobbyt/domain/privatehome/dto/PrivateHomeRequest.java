package com.hobbyt.domain.privatehome.dto;

import com.hobbyt.global.entity.OrderBy;

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
}

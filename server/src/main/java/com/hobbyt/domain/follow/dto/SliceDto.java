package com.hobbyt.domain.follow.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SliceDto<T> {
	private List<T> contents;
	private Boolean hasNext;
}

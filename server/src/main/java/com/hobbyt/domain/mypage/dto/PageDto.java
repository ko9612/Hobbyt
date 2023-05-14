package com.hobbyt.domain.mypage.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PageDto<T> {
	private List<T> content = new ArrayList<>();
	private Long total;
}

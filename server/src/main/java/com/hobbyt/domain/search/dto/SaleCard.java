package com.hobbyt.domain.search.dto;

import com.hobbyt.domain.entity.Period;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaleCard {
	private Long id;
	private String thumbnailImage;
	private String title;
	private Period period;
	private long likeCount;
	private boolean isAlwaysOnSale;
	private Long writerId;
	private String nickname;
}
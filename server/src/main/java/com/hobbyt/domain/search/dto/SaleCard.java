package com.hobbyt.domain.search.dto;

import com.hobbyt.domain.sale.entity.Period;

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
	private Boolean isAlwaysOnSale;
	private Long writerId;
	private String nickname;
	private String profileImage;
}
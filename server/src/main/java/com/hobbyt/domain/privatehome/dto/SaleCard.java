package com.hobbyt.domain.privatehome.dto;

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
	private boolean isAlwaysOnSale;
}

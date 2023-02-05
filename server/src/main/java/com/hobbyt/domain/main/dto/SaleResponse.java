package com.hobbyt.domain.main.dto;

import java.util.List;

import com.hobbyt.domain.sale.entity.Period;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class SaleResponse {
	private List<Card> cards;

	@Getter
	@NoArgsConstructor
	public static class Card {
		private Long id;
		private String title;
		private String thumbnailImage;
		private Period period;
		private long likeCount;
		private Boolean isAlwaysOnSale;
		private Long writerId;
		private String nickname;
		private String profileImage;
	}
}

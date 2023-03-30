package com.hobbyt.domain.privatehome.dto.response;

import java.util.List;

import com.hobbyt.domain.sale.entity.Period;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class PrivateHomeSaleLikeResponse {
	private Boolean hasNext;
	private List<SaleCard> cards;

	@Getter
	@NoArgsConstructor
	public static class SaleCard {
		private Long saleLikeId;
		private Long saleId;
		private String title;
		private String content;
		private String thumbnailImage;
		private long viewCount;
		private long likeCount;
		private Period period;
		private String profileImage;
	}
}

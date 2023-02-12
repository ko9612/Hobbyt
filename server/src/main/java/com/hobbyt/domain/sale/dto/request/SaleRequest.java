package com.hobbyt.domain.sale.dto.request;

import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Period;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.global.entity.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SaleRequest {
	@NotNull
	private String title;
	@NotNull
	private String content;

	private String thumbnailImage;    // 썸네일 이미지 경로

	private int depositEffectiveTime;    // 입금가능시간
	private Delivery delivery;

	private String caution;    // 주의사항
	private String productionProcessLink;    // 제작과정 링크

	private List<String> tags;
	private Account account;
	private PeriodDto period;    // 판매기간

	private String refundExchangePolicy;    // 환불, 교환 정책

	private Boolean isAlwaysOnSale;    // 상시판매여부
	private List<ProductDto> products;

	@Getter
	@Setter
	@NoArgsConstructor
	private static class PeriodDto {
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private LocalDate startedAt;
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private LocalDate endAt;
	}

	public Sale toSale() {
		Period period = new Period(this.period.startedAt, this.period.endAt);
		return Sale.of(title, content, refundExchangePolicy, period, account, productionProcessLink,
			caution, delivery, depositEffectiveTime, isAlwaysOnSale);
	}

	public boolean isPeriodNull() {
		return this.period.getStartedAt() == null && this.period.getEndAt() == null;
	}
}

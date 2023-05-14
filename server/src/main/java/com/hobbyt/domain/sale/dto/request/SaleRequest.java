package com.hobbyt.domain.sale.dto.request;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Period;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.global.entity.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaleRequest {
	@NotBlank
	private String title;
	@NotBlank
	private String content;

	private String thumbnailImage;    // 썸네일 이미지 경로

	private Integer depositEffectiveTime;    // 입금가능시간
	@NotNull
	private Delivery delivery;

	private String caution;    // 주의사항
	private String productionProcessLink;    // 제작과정 링크

	private List<String> tags;
	@NotNull
	private Account account;

	private Period period;
	private String refundExchangePolicy;    // 환불, 교환 정책
	private Boolean isAlwaysOnSale;    // 상시판매여부
	@NotNull
	private List<ProductDto> products;

	public List<Product> getProducts() {
		return this.products.stream().map(productDto -> productDto.toEntity()).collect(Collectors.toUnmodifiableList());
	}

	public Sale toSale() {
		return Sale.of(title, thumbnailImage, content, refundExchangePolicy, period, account,
			productionProcessLink, caution, delivery, depositEffectiveTime, isAlwaysOnSale);
	}

	public boolean isPeriodNull() {
		return this.period.getStartedAt() == null && this.period.getEndAt() == null;
	}
}

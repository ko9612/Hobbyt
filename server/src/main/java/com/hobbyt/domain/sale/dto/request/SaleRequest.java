package com.hobbyt.domain.sale.dto.request;

import java.util.List;
import java.util.stream.Collectors;

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
	@NotNull
	private String title;
	@NotNull
	private String content;

	private int depositEffectiveTime;    // 입금가능시간
	private Delivery delivery;

	private String caution;    // 주의사항
	private String productionProcessLink;    // 제작과정 링크

	private List<String> tags;
	private Account account;
	private Period period;    // 판매기간

	private String refundExchangePolicy;    // 환불, 교환 정책

	private List<ProductDto> products;
	private Boolean isAlwaysOnSale;    // 상시판매여부

	@Getter
	@NoArgsConstructor
	private static class ProductDto {
		private String name;
		private int price;
		private int stockQuantity;
	}

	public Sale toSale() {
		return Sale.of(title, content, refundExchangePolicy, period, account, productionProcessLink,
			caution, delivery, depositEffectiveTime, isAlwaysOnSale);
	}

	public List<Product> toProducts() {
		return products.stream().map(product -> Product.of(product.name, product.price, product.stockQuantity))
			.collect(Collectors.toList());
	}

	public int getProductsSize() {
		return this.products.size();
	}

	public boolean isPeriodNull() {
		return this.period.getStartedAt() == null && this.period.getEndAt() == null;
	}
}

package com.hobbyt.domain.sale.dto.response;

import java.util.List;
import java.util.stream.Collectors;

import com.hobbyt.domain.entity.Period;
import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.global.entity.Account;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaleResponse {
	private Long id;
	private String title;
	private String content;
	private String refundExchangePolicy;
	private String productionProcessLink;
	private String caution;
	private Period period;
	private Account account;
	private Delivery delivery;
	private int depositEffectiveTime;
	private boolean isAlwaysOnSale;
	private boolean isDeleted;
	private List<ProductDto> products;
	private List<String> tags;

	@Getter
	@NoArgsConstructor
	private static class ProductDto {
		private Long id;
		private String name;
		private String imageUrl;
		private int price;
		private int stockQuantity;

		@Builder
		private ProductDto(Product product) {
			this.id = product.getId();
			this.name = product.getName();
			this.imageUrl = product.getImageUrl();
			this.price = product.getPrice();
			this.stockQuantity = product.getStockQuantity();
		}
	}

	public static SaleResponse of(Sale sale, List<Product> products, List<String> tags) {
		return new SaleResponse(sale, products, tags);
	}

	private SaleResponse(Sale sale, List<Product> products, List<String> tags) {
		setSale(sale);
		setProducts(products);
		setTags(tags);
	}

	private void setProducts(List<Product> products) {
		this.products = products.stream().map(ProductDto::new).collect(Collectors.toUnmodifiableList());
	}

	private void setTags(List<String> tags) {
		this.tags = tags;
	}

	private void setSale(Sale sale) {
		this.id = sale.getId();
		this.title = sale.getTitle();
		this.content = sale.getContent();
		this.refundExchangePolicy = sale.getRefundExchangePolicy();
		this.productionProcessLink = sale.getProductionProcessLink();
		this.caution = sale.getCaution();
		this.period = sale.getPeriod();
		this.account = sale.getAccount();
		this.delivery = sale.getDelivery();
		this.depositEffectiveTime = sale.getDepositEffectiveTime();
		this.isAlwaysOnSale = sale.isAlwaysOnSale();
		this.isDeleted = sale.isDeleted();
	}
}

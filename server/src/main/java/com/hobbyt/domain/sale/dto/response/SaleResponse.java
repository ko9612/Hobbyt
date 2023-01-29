package com.hobbyt.domain.sale.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Period;
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
	private WriterBox writer;

	@Getter
	public static class WriterBox {
		private Long id;
		private String email;
		private String nickName;
		private String headerImage;
		private String profileImage;
		private LocalDateTime signedUpAt;
		private int followings;
		private int followers;

		public WriterBox(Member member) {
			this.id = member.getId();
			this.email = member.getEmail();
			this.nickName = member.getNickname();
			this.headerImage = member.getHeaderImage();
			this.profileImage = member.getProfileImage();
			this.signedUpAt = member.getCreatedAt();
			this.followings = member.getFollowingCount();
			this.followers = member.getFollowerCount();
		}
	}

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
		setWriter(sale.getWriter());
	}

	private void setWriter(Member writer) {
		this.writer = new WriterBox(writer);
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

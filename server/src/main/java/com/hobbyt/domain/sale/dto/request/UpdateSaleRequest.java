package com.hobbyt.domain.sale.dto.request;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.hobbyt.domain.sale.entity.Delivery;
import com.hobbyt.domain.sale.entity.Period;
import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;
import com.hobbyt.global.entity.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateSaleRequest {
	private String title;
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

	private List<ProductDto> products;
	private Boolean isAlwaysOnSale;    // 상시판매여부

	@Getter
	@Setter
	@NoArgsConstructor
	private static class PeriodDto {
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private LocalDate startedAt;
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private LocalDate endAt;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class ProductDto {
		private Long id;
		private String name;
		private int price;
		private int stockQuantity;
		private MultipartFile image;
	}

	public Sale toSale() {
		Period period = new Period(this.period.startedAt, this.period.endAt);
		return Sale.of(title, thumbnailImage, content, refundExchangePolicy, period, account, productionProcessLink,
			caution, delivery, depositEffectiveTime, isAlwaysOnSale);
	}

	public List<Product> toProducts() {
		return products.stream()
			.map(product -> Product.of(product.id, product.name, product.price, product.stockQuantity))
			.collect(Collectors.toList());
	}

	// TODO 이미지 처리할때 update에서 아래 메서드로 변경
	public List<Product> toProducts(List<String> imageUrls) {
		List<Product> result = new ArrayList<>();
		for (int index = 0; index < products.size(); index++) {
			ProductDto productDto = products.get(index);
			Product product = Product.of(productDto.id, productDto.name, productDto.price, productDto.stockQuantity);
			product.updateImageUrl(imageUrls.get(index));
		}

		return result;
	}

	public int getProductsSize() {
		return this.products.size();
	}

	public boolean isPeriodNull() {
		return this.period.getStartedAt() == null && this.period.getEndAt() == null;
	}
}

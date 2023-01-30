package com.hobbyt.domain.sale.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.global.entity.Account;
import com.hobbyt.global.entity.Article;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sale extends Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writer_id")
	private Member writer;

	// 환불/교환안내
	@Column(nullable = false, columnDefinition = "MEDIUMTEXT")
	private String refundExchangePolicy;

	// 제작과정 url
	private String productionProcessLink;

	// 주의 사항
	@Column(columnDefinition = "MEDIUMTEXT")
	private String caution;
	// 판매기간 연,월,일
	@Embedded
	private Period period;

	// 입금계좌 정보
	@Embedded
	private Account account;

	// 배송정보	>> 평균 소요일, 배송사, 가격
	@Embedded
	private Delivery delivery;

	// 입금가능시간
	private int depositEffectiveTime;

	// 상품 목록
	@OneToMany(mappedBy = "sale", fetch = FetchType.LAZY)
	List<Product> products = new ArrayList<>();

	// 상시판매 여부 >> 제거 고민
	private boolean alwaysOnSale;
	private boolean deleted = false;

	@Builder
	private Sale(String refundExchangePolicy, String productionProcessLink,
		String caution, Period period, Account account, Delivery delivery, int depositEffectiveTime,
		boolean alwaysOnSale) {

		this.refundExchangePolicy = refundExchangePolicy;
		this.productionProcessLink = productionProcessLink;
		this.caution = caution;
		this.period = period;
		this.account = account;
		this.delivery = delivery;
		this.depositEffectiveTime = depositEffectiveTime;
		this.alwaysOnSale = alwaysOnSale;
	}

	public static Sale of(String title, String content, String refundExchangePolicy, Period period, Account account,
		String productionProcessLink, String caution, Delivery delivery, int depositEffectiveTime,
		boolean alwaysOnSale) {

		Sale sale = Sale.builder()
			.refundExchangePolicy(refundExchangePolicy)
			.period(period)
			.account(account)
			.productionProcessLink(productionProcessLink)
			.caution(caution)
			.delivery(delivery)
			.depositEffectiveTime(depositEffectiveTime)
			.alwaysOnSale(alwaysOnSale)
			.build();

		sale.updateTitle(title);
		sale.updateContent(content);
		return sale;
	}

	public void setWriter(Member writer) {
		this.writer = writer;
	}

	public void addProduct(Product product) {
		this.products.add(product);
		product.setSale(this);
	}

	public void removeProduct(Product product) {
		this.products.remove(product);
	}

	public void update(Sale updateSale) {
		if (updateSale.getTitle() != null) {
			updateTitle(updateSale.getTitle());
		}
		if (updateSale.getContent() != null) {
			updateContent(updateSale.getContent());
		}

		this.depositEffectiveTime = updateSale.depositEffectiveTime;
		this.delivery = updateSale.delivery;
		this.caution = updateSale.caution;
		this.productionProcessLink = updateSale.productionProcessLink;
		this.refundExchangePolicy = updateSale.refundExchangePolicy;
		this.period = updateSale.period;
		this.account = updateSale.account;
		this.alwaysOnSale = updateSale.alwaysOnSale;
	}

	public void delete() {
		this.deleted = true;
	}
}

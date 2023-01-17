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

import com.hobbyt.domain.entity.Account;
import com.hobbyt.domain.entity.Period;
import com.hobbyt.domain.entity.Product;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.global.entity.Article;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

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
	private String refundPolicy;

	// 판매기간 연,월,일
	@Embedded
	@Column(nullable = false)
	private Period period;

	// 입금계좌 정보
	@Column(nullable = false)
	private Account account;

	// 제작과정 url
	private String url;

	// 주의 사항
	// 상시판매 여부
	// 배송정보	>> 평균 소요일, 배송사, 가격

	List<Product> products = new ArrayList<>();
}

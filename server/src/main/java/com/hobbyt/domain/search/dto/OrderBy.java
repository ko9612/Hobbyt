package com.hobbyt.domain.search.dto;

import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import com.querydsl.core.types.OrderSpecifier;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderBy {
	POST_NEWEST("블로그 최신순", new OrderSpecifier<?>[] {post.id.desc()}),
	POST_MOSTLIKE("블로그 인기순", new OrderSpecifier<?>[] {post.likeCount.desc(), post.id.desc()}),
	SALE_NEWEST("판매 게시글 최신순", new OrderSpecifier<?>[] {sale.id.desc()}),
	SALE_MOST_LIKE("판매 게시글 인기순", new OrderSpecifier<?>[] {sale.likeCount.desc(), sale.id.desc()});

	private final String name;
	private final OrderSpecifier<?>[] orderSpecifiers;
}

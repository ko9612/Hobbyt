package com.hobbyt.domain.tag.repository;

import static com.hobbyt.domain.sale.entity.QSaleTag.*;
import static com.hobbyt.domain.tag.entity.QTag.*;

import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomTagRepositoryImpl implements CustomTagRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public List<String> getTagsBySaleId(Long saleId) {
		return queryFactory.select(tag.content)
			.from(saleTag)
			.join(saleTag.tag, tag)
			.where(saleTag.sale.id.eq(saleId))
			.fetch();
	}
}

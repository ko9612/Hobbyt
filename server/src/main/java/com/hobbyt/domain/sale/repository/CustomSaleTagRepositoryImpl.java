package com.hobbyt.domain.sale.repository;

import static com.hobbyt.domain.sale.entity.QSaleTag.*;
import static com.hobbyt.domain.tag.entity.QTag.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hobbyt.domain.sale.entity.SaleTag;
import com.hobbyt.domain.tag.entity.Tag;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomSaleTagRepositoryImpl implements CustomSaleTagRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public Map<Tag, SaleTag> getTagSaleTagMapBySaleId(Long saleId) {

		List<Tuple> result = queryFactory.select(tag, saleTag)
			.from(saleTag)
			.join(saleTag.tag, tag)
			.where(saleTag.sale.id.eq(saleId))
			.fetch();

		Map<Tag, SaleTag> map = new HashMap<>();
		result.forEach(
			tuple -> map.put(tuple.get(tag), tuple.get(saleTag))
		);

		return map;
	}
}

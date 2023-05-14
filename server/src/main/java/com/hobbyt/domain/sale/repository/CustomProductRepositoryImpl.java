package com.hobbyt.domain.sale.repository;

import static com.hobbyt.domain.order.entity.QOrderItem.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomProductRepositoryImpl implements CustomProductRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public Map<Long, Boolean> getProductsIdBySaleId(Long saleId) {
		List<Long> products = queryFactory.select(product.id)
			.from(product)
			.join(product.sale, sale)
			.where(sale.id.eq(saleId))
			.fetch();

		Map<Long, Boolean> result = new HashMap<>();
		products.forEach(
			id -> result.put(id, queryFactory.selectFrom(orderItem)
				.join(orderItem.product, product)
				.where(orderItem.product.id.eq(id))
				.fetchFirst() != null)
		);
		return result;
	}
}

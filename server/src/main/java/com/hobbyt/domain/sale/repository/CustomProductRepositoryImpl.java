package com.hobbyt.domain.sale.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.order.entity.QOrderItem.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.hobbyt.domain.mypage.dto.OrderedProductInfo;
import com.hobbyt.domain.mypage.dto.PageDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class CustomProductRepositoryImpl implements CustomProductRepository {
	private final JPAQueryFactory queryFactory;

	public CustomProductRepositoryImpl(EntityManager em) {
		queryFactory = new JPAQueryFactory(em);
	}

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

	@Override
	public PageDto getOrderedProductsByMemberEmail(String email, Pageable pageable) {
		List<OrderedProductInfo> data = queryFactory.select(
				Projections.constructor(OrderedProductInfo.class,
					sale.id,
					product.name,
					sale.period,
					sale.isAlwaysOnSale,
					sale.isDeleted,
					product.salesVolume,
					product.createdAt
				))
			.from(sale)
			.join(sale.products, product)
			.join(sale.writer, member)
			.where(member.email.eq(email))
			.orderBy(sale.id.desc(), product.id.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		Long total = getOrderedProductsCount(email);

		return new PageDto(data, total);
	}

	private Long getOrderedProductsCount(String email) {
		return queryFactory.select(
				product.count()
			)
			.from(sale)
			.join(sale.products, product)
			.join(sale.writer, member)
			.where(member.email.eq(email))
			.fetchOne();
	}
}

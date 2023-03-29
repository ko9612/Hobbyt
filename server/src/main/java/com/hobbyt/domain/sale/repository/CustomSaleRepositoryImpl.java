package com.hobbyt.domain.sale.repository;

import static com.hobbyt.domain.order.entity.QOrder.*;
import static com.hobbyt.domain.order.entity.QOrderItem.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomSaleRepositoryImpl implements CustomSaleRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public Long findSaleIdByOrderId(Long orderId) {
		return queryFactory.select(sale.id).distinct()
			.from(order)
			.join(order.orderItems, orderItem)
			.join(orderItem.product, product)
			.join(product.sale, sale)
			.where(order.id.eq(orderId))
			.fetchOne();
	}

	/*@Override
	public Optional<Sale> findSaleAndProductsBySaleId(Long saleId) {

		Sale sale = queryFactory.select(QSale.sale).distinct()
			.from(QSale.sale)
			.join(QSale.sale.writer, member).fetchJoin()
			.join(QSale.sale.products, product).fetchJoin()
			.where(QSale.sale.id.eq(saleId), product.isDeleted.eq(false))
			.setLockMode(LockModeType.PESSIMISTIC_WRITE)
			.fetchOne();

		return Optional.ofNullable(sale);
	}*/
}

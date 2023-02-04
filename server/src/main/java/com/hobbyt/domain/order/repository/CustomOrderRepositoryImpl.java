package com.hobbyt.domain.order.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.order.entity.QOrder.*;
import static com.hobbyt.domain.order.entity.QOrderItem.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import javax.persistence.EntityManager;

import com.hobbyt.domain.mypage.dto.OrderDetails;
import com.hobbyt.domain.order.entity.Order;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomOrderRepositoryImpl implements CustomOrderRepository {
	private final JPAQueryFactory queryFactory;

	public CustomOrderRepositoryImpl(EntityManager entityManager) {
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	@Override
	public OrderDetails findOrderDetailsByOrderId(Long orderId) {
		Order foundOrder = queryFactory.select(order).distinct()
			.from(order)
			.join(order.orderItems, orderItem).fetchJoin()
			.join(orderItem.product, product).fetchJoin()
			.where(order.id.eq(orderId))
			.fetchOne();

		Tuple tuple = queryFactory.select(
				member.nickname,
				member.phoneNumber,
				member.email,
				sale.account,
				sale.delivery.deliveryPrice).distinct()
			.from(order)
			.join(order.member, member)
			.join(order.orderItems, orderItem)
			.join(orderItem.product, product)
			.join(product.sale, sale)
			.where(order.id.eq(orderId))
			.fetchOne();

		return OrderDetails.builder()
			.order(foundOrder)
			.nickname(tuple.get(member.nickname))
			.phoneNumber(tuple.get(member.phoneNumber))
			.email(tuple.get(member.email))
			.sellerAccount(tuple.get(sale.account))
			.deliveryPrice(tuple.get(sale.delivery.deliveryPrice))
			.build();
	}
}

package com.hobbyt.domain.order.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.order.entity.QOrder.*;
import static com.hobbyt.domain.order.entity.QOrderItem.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.mypage.dto.OrderDetails;
import com.hobbyt.domain.mypage.dto.OrderDto;
import com.hobbyt.domain.mypage.dto.PageDto;
import com.hobbyt.domain.order.entity.Order;
import com.hobbyt.global.error.exception.OrderNotExistException;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomOrderRepositoryImpl implements CustomOrderRepository {
	private final JPAQueryFactory queryFactory;

	public CustomOrderRepositoryImpl(EntityManager entityManager) {
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	@Override
	public OrderDetails findOrderDetailsByOrderId(Long orderId, String email) {
		Order foundOrder = queryFactory.select(order).distinct()
			.from(order)
			.join(order.member, member)
			.join(order.orderItems, orderItem).fetchJoin()
			.join(orderItem.product, product).fetchJoin()
			.where(order.id.eq(orderId), member.email.eq(email))
			.fetchOne();

		if (foundOrder == null) {
			throw new OrderNotExistException();
		}

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
			.where(order.id.eq(orderId), member.email.eq(email))
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

	@Override
	public PageDto findOrdersByEmail(String email, Pageable pageable) {
		List<OrderDto> content = queryFactory.select(Projections.fields(OrderDto.class,
					order.id,
					sale.title,
					member.nickname,
					order.createdAt,
					order.status
				)
			).from(order)
			.join(order.member, member)
			.join(sale).on(sale.writer.eq(member))
			.where(member.email.eq(email))
			.orderBy(order.id.desc())
			.fetch();

		Long total = getTotalOrdersByEmail(email);

		return new PageDto(content, total);
	}

	private Long getTotalOrdersByEmail(String email) {
		return queryFactory.select(order.count())
			.from(order)
			.join(order.member, member)
			.where(member.email.eq(email))
			.fetchOne();
	}
}

package com.hobbyt.domain.order.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.order.entity.QOrder.*;
import static com.hobbyt.domain.order.entity.QOrderItem.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.mypage.dto.OrderDetails;
import com.hobbyt.domain.mypage.dto.OrderDto;
import com.hobbyt.domain.mypage.dto.PageDto;
import com.hobbyt.domain.order.entity.Order;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class CustomOrderRepositoryImpl implements CustomOrderRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public OrderDetails findOrderDetailsByOrderId(Long orderId) {
		Order foundOrder = queryFactory.select(order).distinct()
			.from(order)
			.join(order.member, member)
			.join(order.orderItems, orderItem).fetchJoin()
			.join(orderItem.product, product).fetchJoin()
			.where(order.id.eq(orderId))
			.fetchOne();

		Tuple tuple = queryFactory.select(
				member.email,
				sale.title,
				sale.thumbnailImage,
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
			.title(tuple.get(sale.title))
			.thumbnailImage(tuple.get(sale.thumbnailImage))
			.email(tuple.get(member.email))
			.sellerAccount(tuple.get(sale.account))
			.deliveryPrice(tuple.get(sale.delivery.deliveryPrice))
			.build();
	}

	@Override
	public PageDto findMyOrdersByEmail(String email, Pageable pageable) {
		List<OrderDto> content = queryFactory.select(Projections.fields(OrderDto.class,
				order.id.as("orderId"),
				sale.title,
				member.nickname,
				order.createdAt,
				order.status
			)).distinct()
			.from(order)
			.join(order.member, member)
			.join(order.orderItems, orderItem)
			.join(orderItem.product, product)
			.join(product.sale, sale)
			// .join(sale).on(sale.writer.eq(member))
			.where(member.email.eq(email))
			.orderBy(order.id.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		Long total = getTotalMyOrdersByEmail(email);

		return new PageDto(content, total);
	}

	private Long getTotalMyOrdersByEmail(String email) {
		return queryFactory.select(order.count())
			.from(order)
			.join(order.member, member)
			.where(member.email.eq(email))
			.fetchOne();
	}

	@Override
	public PageDto findOrdersByEmail(String email, Pageable pageable) {
		List<OrderDto> content = queryFactory.select(Projections.fields(OrderDto.class,
					order.id.as("orderId"),
					sale.title,
					order.member.nickname,
					order.createdAt,
					order.status
				)
			).distinct()
			.from(sale)
			.join(sale.writer, member)
			.join(product).on(product.sale.eq(sale))
			.join(orderItem).on(orderItem.product.eq(product))
			.join(orderItem.order, order)
			// .from(order)
			// .join(order.member, member)
			// .join(sale).on(sale.writer.eq(member))
			.where(member.email.eq(email))
			.orderBy(order.id.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		Long total = getTotalOrdersByEmail(email);

		return new PageDto(content, total);
	}

	private Long getTotalOrdersByEmail(String email) {
		return queryFactory.select(order.count())
			.from(sale)
			.join(sale.writer, member)
			.join(product).on(product.sale.eq(sale))
			.join(orderItem).on(orderItem.product.eq(product))
			.join(orderItem.order, order)
			.where(member.email.eq(email))
			.fetchOne();
	}
}
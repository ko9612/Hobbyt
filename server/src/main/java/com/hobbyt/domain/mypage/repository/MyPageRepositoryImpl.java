package com.hobbyt.domain.mypage.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.order.entity.QOrder.*;
import static com.hobbyt.domain.order.entity.QOrderItem.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.hobbyt.domain.mypage.dto.MyOrderDto;
import com.hobbyt.domain.mypage.dto.OrderDto;
import com.hobbyt.domain.mypage.dto.OrderedProductInfo;
import com.hobbyt.domain.mypage.dto.PageDto;
import com.hobbyt.domain.mypage.dto.response.OrderDetails;
import com.hobbyt.domain.order.entity.Order;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MyPageRepositoryImpl implements MyPageRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public PageDto getOrderedProductsByMemberEmail(String email, Pageable pageable) {
		List<OrderedProductInfo> content = queryFactory.select(
				Projections.constructor(OrderedProductInfo.class,
					sale.id,
					sale.writer.id,
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

		return new PageDto(content, total);
	}

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
				sale.writer.id,
				sale.title,
				sale.id,
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
			.sellerId(tuple.get(sale.writer.id))
			.saleId(tuple.get(sale.id))
			.email(tuple.get(member.email))
			.sellerAccount(tuple.get(sale.account))
			.deliveryPrice(tuple.get(sale.delivery.deliveryPrice))
			.build();
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

	@Override
	public PageDto findMyOrdersByEmail(String email, Pageable pageable) {
		List<MyOrderDto> content = queryFactory.select(Projections.fields(MyOrderDto.class,
				order.id.as("orderId"),
				sale.writer.id.as("sellerId"),
				sale.title,
				sale.writer.nickname,
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
		List<OrderDto> content = queryFactory.select(Projections.constructor(OrderDto.class,
					order.id,
					sale.title,
					order.member.nickname,
					order.createdAt,
					order.status,
					order.orderNumber,
					sale.writer.id
				)
			).distinct()
			.from(sale)
			.join(sale.writer, member)
			.join(product).on(product.sale.eq(sale))
			.join(orderItem).on(orderItem.product.eq(product))
			.join(orderItem.order, order)
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

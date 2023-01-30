package com.hobbyt.domain.main.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostLike.*;
import static com.hobbyt.domain.sale.entity.QSale.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.main.dto.HotBloggerResponse;
import com.hobbyt.domain.main.dto.HotPost;
import com.hobbyt.domain.main.dto.SaleRequest;
import com.hobbyt.domain.main.dto.SaleResponse;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MainRepositoryImpl implements MainRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public List<HotPost> getHotPosts() {
		final int postCount = 5;
		final int amountDays = 7;

		List<Tuple> tuples = queryFactory
			.select(post.id, postLike.count())
			.from(postLike)
			.join(postLike.post, post)
			.where(postLike.createdAt.after(LocalDateTime.now().minusDays(amountDays)))
			.groupBy(post.id)
			.orderBy(postLike.count().desc())
			.limit(postCount)
			.fetch();

		List<Long> postIds = tuples.stream()
			.map(tuple -> tuple.get(post.id))
			.collect(Collectors.toList());

		return queryFactory
			.select(Projections.fields(HotPost.class,
				post.id.as("postId"),
				post.title,
				post.content,
				post.viewCount,
				post.likeCount,
				post.isPublic,
				post.createdAt,
				member.id.as("writerId"),
				member.nickname
			))
			.from(post)
			.join(post.writer, member)
			.where(post.id.in(postIds))
			.fetch();
	}

	@Override
	public HotBloggerResponse getHotBloggers(int count) {

		return null;
	}

	@Override
	public SaleResponse getSaleResponse(SaleRequest request) {
		List<SaleResponse.Card> cards = queryFactory
			.select(Projections.fields(SaleResponse.Card.class,
				sale.id.as("saleId"),
				sale.title,
				sale.thumbnailImage,
				sale.period,
				sale.likeCount,
				member.id.as("memberId"),
				member.nickname
			))
			.from(sale)
			.join(sale.writer, member)
			.orderBy(request.getOrderBy().getOrderSpecifiers())
			.limit(request.getCount())
			.fetch();

		return new SaleResponse(cards);
	}
}

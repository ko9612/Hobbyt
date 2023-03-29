package com.hobbyt.domain.search.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostTag.*;
import static com.hobbyt.domain.sale.entity.QProduct.*;
import static com.hobbyt.domain.sale.entity.QSale.*;
import static com.hobbyt.domain.sale.entity.QSaleTag.*;
import static com.hobbyt.domain.tag.entity.QTag.*;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.search.dto.SaleCard;
import com.hobbyt.domain.search.dto.request.SearchRequest;
import com.hobbyt.domain.search.dto.response.SearchPostResponse;
import com.hobbyt.domain.search.dto.response.SearchSaleResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchRepositoryImpl implements SearchRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public SearchPostResponse searchPostsByKeyword(SearchRequest params) {
		final String prefix = "/api/images/";

		List<SearchPostResponse.PostCard> cards = queryFactory
			.select(Projections.fields(SearchPostResponse.PostCard.class,
				post.id,
				post.title,
				post.content,
				Expressions.asString(prefix).append(post.thumbnailImage).as("thumbnailImage"),
				post.viewCount,
				post.likeCount,
				post.isPublic,
				post.createdAt,
				member.id.as("writerId"),
				member.nickname,
				member.profileImage
			)).distinct()
			.from(postTag)
			.join(postTag.post, post)
			.join(postTag.tag, tag)
			.join(post.writer, member)
			.where(postsContainsKeyword(params.getKeyword()))
			.orderBy(params.getOrderBy())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new SearchPostResponse(hasNext, cards);
	}

	private BooleanBuilder postsContainsKeyword(final String keyword) {
		return postTitleContainsKeyword(keyword).or(postContentContainsKeyword(keyword))
			.or(tagContainsKeyword(keyword)).or(writerContainsKeyword(keyword));
	}

	private BooleanBuilder postTitleContainsKeyword(final String keyword) {
		return nullSafeBuilder(() -> post.title.contains(keyword));
	}

	private BooleanBuilder postContentContainsKeyword(final String keyword) {
		return nullSafeBuilder(() -> post.content.contains(keyword));
	}

	@Override
	public SearchSaleResponse searchSalesByKeyword(SearchRequest params) {
		List<SaleCard> cards = queryFactory.select(Projections.fields(SaleCard.class,
				sale.id,
				sale.thumbnailImage,
				sale.title,
				sale.period,
				sale.likeCount,
				sale.isAlwaysOnSale,
				member.id.as("writerId"),
				member.nickname,
				member.profileImage)).distinct()
			.from(saleTag)
			.join(saleTag.sale, sale)
			.join(saleTag.tag, tag)
			.join(sale.writer, member)
			.join(sale.products, product)
			.where(sale.isDeleted.eq(false)
				.and(salesContainsKeyword(params.getKeyword())))
			.orderBy(params.getOrderBy())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return SearchSaleResponse.of(cards, hasNext);
	}

	private Boolean getHasNext(List<?> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}

	private BooleanBuilder salesContainsKeyword(final String keyword) {
		return saleTitleContainsKeyword(keyword).or(saleContentContainsKeyword(keyword))
			.or(tagContainsKeyword(keyword)).or(writerContainsKeyword(keyword)).or(productContainsKeyword(keyword));
	}

	private BooleanBuilder productContainsKeyword(final String keyword) {
		return nullSafeBuilder(() -> product.name.contains(keyword));
	}

	private BooleanBuilder writerContainsKeyword(final String keyword) {
		return nullSafeBuilder(() -> member.nickname.contains(keyword));
	}

	private BooleanBuilder saleTitleContainsKeyword(final String keyword) {
		return nullSafeBuilder(() -> sale.title.contains(keyword));
	}

	private BooleanBuilder saleContentContainsKeyword(final String keyword) {
		return nullSafeBuilder(() -> sale.content.contains(keyword));
	}

	private BooleanBuilder tagContainsKeyword(final String keyword) {
		return nullSafeBuilder(() -> tag.content.contains(keyword));
	}

	private static BooleanBuilder nullSafeBuilder(Supplier<BooleanExpression> f) {
		try {
			return new BooleanBuilder(f.get());
		} catch (IllegalArgumentException exception) {
			return new BooleanBuilder();
		} catch (NullPointerException ex) {
			return new BooleanBuilder();
		}
	}
}

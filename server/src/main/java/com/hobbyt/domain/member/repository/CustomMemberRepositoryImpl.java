package com.hobbyt.domain.member.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostComment.*;
import static com.hobbyt.domain.post.entity.QPostLike.*;
import static com.hobbyt.domain.sale.entity.QSale.*;
import static com.hobbyt.domain.sale.entity.QSaleLike.*;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeRequest;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeSaleResponse;
import com.hobbyt.domain.privatehome.dto.SaleCard;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomMemberRepositoryImpl implements CustomMemberRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public PrivateHomePostResponse getBlogListByWriterId(Long writerId, PrivateHomeRequest params) {
		List<PrivateHomePostResponse.PostCard> cards = queryFactory
			.select(Projections.fields(PrivateHomePostResponse.PostCard.class,
				post.writer.id.as("writerId"),
				post.id,
				post.title,
				post.content,
				post.thumbnailImage,
				post.viewCount,
				post.likeCount,
				post.isPublic,
				post.createdAt
			))
			.from(post)
			.where(post.writer.id.eq(writerId))
			.orderBy(params.getOrderBy())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new PrivateHomePostResponse(hasNext, cards);
	}

	@Override
	public PrivateHomeCommentResponse getCommentListByWriterId(Long writerId, PrivateHomeRequest params) {
		List<PrivateHomeCommentResponse.CommentCard> cards = queryFactory
			.select(Projections.fields(PrivateHomeCommentResponse.CommentCard.class,
				postComment.id,
				postComment.content,
				postComment.createdAt,
				post.id.as("postId"),
				post.writer.id.as("postWriterId"),
				post.thumbnailImage,
				post.title.as("postTitle")
			))
			.from(postComment)
			.join(postComment.post, post)
			.where(postComment.writer.id.eq(writerId))
			.orderBy(postComment.id.desc())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new PrivateHomeCommentResponse(hasNext, cards);
	}

	@Override
	public PrivateHomeSaleResponse getSalesByWriterId(Long writerId, PrivateHomeRequest params) {
		List<SaleCard> cards = queryFactory.select(Projections.fields(SaleCard.class,
				sale.id,
				sale.writer.id.as("writerId"),
				sale.thumbnailImage,
				sale.title,
				sale.period,
				sale.likeCount,
				sale.isAlwaysOnSale))
			.from(sale)
			.where(sale.isDeleted.eq(false), sale.writer.id.eq(writerId))
			.orderBy(
				params.getOrderBy())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return PrivateHomeSaleResponse.of(cards, hasNext);
	}

	@Override
	public PrivateHomePostLikeResponse getPostLikeListByMemberId(Long memberId, PrivateHomeRequest params) {
		List<PrivateHomePostLikeResponse.PostCard> cards = queryFactory
			.select(Projections.fields(PrivateHomePostLikeResponse.PostCard.class,
				postLike.id.as("postLikeId"),
				post.id.as("postId"),
				post.writer.id.as("postWriterId"),
				post.writer.nickname.as("postWriterNickname"),
				post.title,
				post.content,
				post.thumbnailImage,
				post.viewCount,
				post.likeCount,
				post.createdAt
			))
			.from(postLike)
			.join(postLike.post, post)
			.join(postLike.member, member)
			.where(member.id.eq(memberId))
			.orderBy(postLike.id.desc())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new PrivateHomePostLikeResponse(hasNext, cards);
	}

	@Override
	public PrivateHomeSaleLikeResponse getSaleLikeByMemberId(Long memberId, PrivateHomeRequest params) {
		List<PrivateHomeSaleLikeResponse.SaleCard> cards = queryFactory
			.select(Projections.fields(PrivateHomeSaleLikeResponse.SaleCard.class,
				saleLike.id.as("saleLikeId"),
				sale.id.as("saleId"),
				sale.title,
				sale.content,
				sale.thumbnailImage,
				sale.viewCount,
				sale.likeCount,
				sale.createdAt
			))
			.from(saleLike)
			.join(saleLike.sale, sale)
			.join(saleLike.member, member)
			.where(member.id.eq(memberId))
			.orderBy(saleLike.id.desc())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new PrivateHomeSaleLikeResponse(hasNext, cards);
	}

	private Boolean getHasNext(List<?> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}
}

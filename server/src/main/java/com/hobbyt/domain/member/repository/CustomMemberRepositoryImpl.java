package com.hobbyt.domain.member.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostComment.*;
import static com.hobbyt.domain.post.entity.QPostLike.*;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.privatehome.dto.PrivateHomeCommentResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostLikeResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomePostResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomMemberRepositoryImpl implements CustomMemberRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public PrivateHomePostResponse getBlogListByWriterId(Long writerId, PrivateHomeServiceDto params) {
		List<PrivateHomePostResponse.PostCard> cards = queryFactory
			.select(Projections.fields(PrivateHomePostResponse.PostCard.class,
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
	public PrivateHomeCommentResponse getCommentListByWriterId(Long writerId, PrivateHomeServiceDto params) {
		List<PrivateHomeCommentResponse.CommentCard> cards = queryFactory
			.select(Projections.fields(PrivateHomeCommentResponse.CommentCard.class,
				postComment.id,
				postComment.content,
				postComment.createdAt,
				post.id.as("postId"),
				post.title.as("postTitle")
			))
			.from(postComment)
			.join(postComment.post, post)
			.where(postComment.writer.id.eq(writerId))
			.orderBy(params.getOrderBy())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new PrivateHomeCommentResponse(hasNext, cards);
	}

	@Override
	public PrivateHomePostLikeResponse getPostLikeListByMemberId(Long memberId, PrivateHomeServiceDto params) {
		List<PrivateHomePostLikeResponse.PostCard> cards = queryFactory
			.select(Projections.fields(PrivateHomePostLikeResponse.PostCard.class,
				postLike.id.as("postLikeId"),
				post.id.as("postId"),
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
			.orderBy(params.getOrderBy())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new PrivateHomePostLikeResponse(hasNext, cards);
	}

	private Boolean getHasNext(List<?> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}
}

package com.hobbyt.domain.search.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostTag.*;
import static com.hobbyt.domain.tag.entity.QTag.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.search.dto.SearchPostResponse;
import com.hobbyt.domain.search.dto.SearchRequest;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
@Transactional(readOnly = true)
public class SearchRepositoryImpl implements SearchRepository {
	private final JPAQueryFactory queryFactory;

	public SearchRepositoryImpl(EntityManager entityManager) {
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	@Override
	public SearchPostResponse searchPostsByKeyword(SearchRequest params) {
		List<Long> postIdsCorrespondingKeyword = queryFactory
			.select(post.id)
			.from(postTag)
			.join(postTag.post, post)
			.join(postTag.tag, tag)
			.where(post.title.contains(params.getKeyWord())
				.or(post.content.contains(params.getKeyWord()))
				.or(tag.content.contains(params.getKeyWord())))
			.orderBy(params.getOrderBy())
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		List<SearchPostResponse.PostCard> cards = queryFactory
			.select(Projections.fields(SearchPostResponse.PostCard.class,
				post.id,
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
			.where(post.id.in(postIdsCorrespondingKeyword))
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new SearchPostResponse(hasNext, cards);
	}

	private Boolean getHasNext(List<?> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}
}

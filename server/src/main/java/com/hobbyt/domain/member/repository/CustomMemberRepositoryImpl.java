package com.hobbyt.domain.member.repository;

import static com.hobbyt.domain.post.entity.QPost.*;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.privatehome.dto.PrivateHomeBlogResponse;
import com.hobbyt.domain.privatehome.dto.PrivateHomeServiceDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
@Transactional(readOnly = true)
public class CustomMemberRepositoryImpl implements CustomMemberRepository {
	private final JPAQueryFactory queryFactory;

	public CustomMemberRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public PrivateHomeBlogResponse getBlogListByWriterId(Long writerId, PrivateHomeServiceDto.Blog params) {
		List<PrivateHomeBlogResponse.PostCard> cards = queryFactory
			.select(Projections.fields(PrivateHomeBlogResponse.PostCard.class,
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
			.offset(params.getOffset())
			.limit(params.getLimit() + 1)
			.fetch();

		Boolean hasNext = getHasNext(cards, params.getLimit());

		return new PrivateHomeBlogResponse(hasNext, cards);
	}

	private Boolean getHasNext(List<PrivateHomeBlogResponse.PostCard> cards, int limit) {
		if (cards.size() > limit) {
			cards.remove(limit);
			return true;
		}

		return false;
	}
}

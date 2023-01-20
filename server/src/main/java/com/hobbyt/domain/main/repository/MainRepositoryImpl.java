package com.hobbyt.domain.main.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostLike.*;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.main.dto.HotPost;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
@Transactional(readOnly = true)
public class MainRepositoryImpl implements MainRepository {
	private final JPAQueryFactory queryFactory;

	public MainRepositoryImpl(EntityManager entityManager) {
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	@Override
	public List<HotPost> getHotPosts() {
		final int postCount = 5;

		List<Long> postIds = queryFactory
			.select(post.id)
			.from(postLike)
			.join(postLike.post, post)
			.where(postLike.createdAt.goe(LocalDateTime.now().with(DayOfWeek.MONDAY)))
			.groupBy(post.id)
			.orderBy(postLike.id.count().desc(), post.id.desc())
			.limit(postCount)
			.fetch();

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
}

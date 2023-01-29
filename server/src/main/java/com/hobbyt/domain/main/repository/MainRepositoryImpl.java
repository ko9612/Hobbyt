package com.hobbyt.domain.main.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.post.entity.QPost.*;
import static com.hobbyt.domain.post.entity.QPostLike.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.main.dto.HotPost;
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
}

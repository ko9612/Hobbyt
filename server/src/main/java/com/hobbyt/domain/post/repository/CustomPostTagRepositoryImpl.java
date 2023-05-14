package com.hobbyt.domain.post.repository;

import static com.hobbyt.domain.post.entity.QPostTag.*;
import static com.hobbyt.domain.tag.entity.QTag.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hobbyt.domain.post.entity.PostTag;
import com.hobbyt.domain.tag.entity.Tag;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomPostTagRepositoryImpl implements CustomPostTagRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public Map<Tag, PostTag> getTagPostTagMapByPostId(Long postId) {
		List<Tuple> result = queryFactory
			.select(tag, postTag)
			.from(postTag)
			.join(postTag.tag, tag)
			.where(postTag.post.id.eq(postId))
			.fetch();

		Map<Tag, PostTag> map = new HashMap<>();
		result.forEach(
			tuple -> map.put(
				tuple.get(tag), tuple.get(postTag)
			)
		);

		return map;
	}
}

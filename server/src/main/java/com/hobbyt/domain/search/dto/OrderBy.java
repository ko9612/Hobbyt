package com.hobbyt.domain.search.dto;

import static com.hobbyt.domain.post.entity.QPost.*;

import com.querydsl.core.types.OrderSpecifier;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderBy {
	POST_NEWEST("블로그 최신순", post.id.desc()),
	POST_MOSTLIKE("블로그 인기순", post.likeCount.desc());

	private final String name;
	private final OrderSpecifier<?> orderSpecifier;
}

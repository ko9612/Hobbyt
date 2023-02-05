package com.hobbyt.domain.follow.repository;

import static com.hobbyt.domain.follow.entity.QFollow.*;
import static com.hobbyt.domain.member.entity.QMember.*;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.follow.dto.FollowingDto;
import com.hobbyt.domain.follow.dto.SliceDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomFollowRepositoryImpl implements CustomFollowRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public SliceDto findFollowingByEmail(String email, Pageable pageable) {
		List<FollowingDto> contents = queryFactory.select(Projections.fields(FollowingDto.class,
				// follow.following.id,
				member.id,
				member.nickname,
				member.profileImage,
				member.description,
				member.dmReceive
			))
			.from(follow)
			.join(follow.following, member)
			.where(follow.follower.email.eq(email))
			.orderBy(follow.id.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		return new SliceDto(contents, hasNext);
	}

	@Override
	public SliceDto findFollowerByEmail(String email, Pageable pageable) {
		List<FollowingDto> contents = queryFactory.select(Projections.fields(FollowingDto.class,
				member.id,
				member.nickname,
				member.profileImage,
				member.description,
				member.dmReceive
			))
			.from(follow)
			.join(follow.follower, member)
			.where(follow.following.email.eq(email))
			.orderBy(follow.id.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		return new SliceDto(contents, hasNext);
	}

	private Boolean getHasNext(List<?> contents, int limit) {
		if (contents.size() > limit) {
			contents.remove(limit);
			return true;
		}

		return false;
	}
}

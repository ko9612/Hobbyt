package com.hobbyt.domain.follow.repository;

import static com.hobbyt.domain.follow.entity.QFollow.*;
import static com.hobbyt.domain.member.entity.QMember.*;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.follow.dto.FollowingDto;
import com.hobbyt.domain.follow.dto.SliceDto;
import com.hobbyt.domain.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomFollowRepositoryImpl implements CustomFollowRepository {
	private final JPAQueryFactory queryFactory;

	@Override
	public SliceDto findFollowing(Member myInfo, Long memberId, Pageable pageable) {
		List<FollowingDto> contents = queryFactory.select(Projections.constructor(FollowingDto.class,
				// follow.following.id,
				member.id,
				member.nickname,
				member.profileImage,
				member.description
			))
			.from(follow)
			.join(follow.following, member)
			.where(follow.follower.id.eq(memberId))
			.orderBy(member.nickname.asc())
			// .orderBy(follow.id.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		compareMyFollowing(myInfo, contents);

		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		return new SliceDto(contents, hasNext);
	}

	@Override
	public SliceDto findFollower(Member myInfo, Long memberId, Pageable pageable) {
		List<FollowingDto> contents = queryFactory.select(Projections.constructor(FollowingDto.class,
				member.id,
				member.nickname,
				member.profileImage,
				member.description
			))
			.from(follow)
			.join(follow.follower, member)
			.where(follow.following.id.eq(memberId))
			.orderBy(member.nickname.asc())
			// .orderBy(follow.id.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		compareMyFollowing(myInfo, contents);

		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		return new SliceDto(contents, hasNext);
	}

	private void compareMyFollowing(Member myInfo, List<FollowingDto> contents) {
		List<Long> myFollowingId = queryFactory.select(member.id)
			.from(follow)
			.join(follow.following, member)
			.where(follow.follower.eq(myInfo))
			.fetch();

		contents.forEach(content -> {
			if (content.getId() == myInfo.getId()) {
				return;
			}
			content.setIsFollowing(myFollowingId.contains(content.getId()));
		});
	}

	private Boolean getHasNext(List<?> contents, int limit) {
		if (contents.size() > limit) {
			contents.remove(limit);
			return true;
		}

		return false;
	}
}

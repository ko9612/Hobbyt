package com.hobbyt.domain.follow.repository;

import static com.hobbyt.domain.follow.entity.QFollow.*;
import static com.hobbyt.domain.member.entity.QMember.*;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hobbyt.domain.follow.dto.FollowDto;
import com.hobbyt.domain.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomFollowRepositoryImpl implements CustomFollowRepository {
	private final JPAQueryFactory queryFactory;

	/*@Override
	public SliceDto findFollowing(Member myInfo, Long targetMemberId, Pageable pageable) {
		List<FollowDto> contents = queryFactory.select(Projections.constructor(FollowDto.class,
				member.id,
				member.nickname,
				member.profileImage,
				member.description
			))
			.from(follow)
			.join(follow.following, member)
			.where(follow.follower.id.eq(targetMemberId))
			.orderBy(member.nickname.asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		compareMyFollowing(myInfo, contents);

		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		return new SliceDto(contents, hasNext);
	}*/

	/*@Override
	public SliceDto findFollower(Member myInfo, Long targetMemberId, Pageable pageable) {
		List<FollowDto> contents = queryFactory.select(Projections.constructor(FollowDto.class,
				member.id,
				member.nickname,
				member.profileImage,
				member.description
			))
			.from(follow)
			.join(follow.follower, member)
			.where(follow.following.id.eq(targetMemberId))
			.orderBy(member.nickname.asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		compareMyFollowing(myInfo, contents);

		Boolean hasNext = getHasNext(contents, pageable.getPageSize());

		return new SliceDto(contents, hasNext);
	}*/

	@Override
	public List<FollowDto> findFollowings(Long targetMemberId, Pageable pageable) {
		return queryFactory.select(Projections.constructor(FollowDto.class,
				member.id,
				member.nickname,
				member.profileImage,
				member.description
			))
			.from(follow)
			.join(follow.following, member)
			.where(follow.follower.id.eq(targetMemberId))
			.orderBy(member.nickname.asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();
	}

	@Override
	public List<FollowDto> findFollowers(Long targetMemberId, Pageable pageable) {
		return queryFactory.select(Projections.constructor(FollowDto.class,
				member.id,
				member.nickname,
				member.profileImage,
				member.description
			))
			.from(follow)
			.join(follow.follower, member)
			.where(follow.following.id.eq(targetMemberId))
			.orderBy(member.nickname.asc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize() + 1)
			.fetch();
	}

	public void compareMyFollowing(Member myInfo, List<FollowDto> contents) {
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
}

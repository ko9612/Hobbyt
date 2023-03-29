package com.hobbyt.domain.follow.repository;

import static com.hobbyt.domain.follow.entity.QFollow.*;
import static com.hobbyt.domain.member.entity.QMember.*;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.hobbyt.domain.follow.dto.FollowDto;
import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.member.entity.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FollowQueryRepositoryImpl implements FollowQueryRepository {
	private final JPAQueryFactory queryFactory;

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

	// member가 팔로우한 회원 id 목록
	public List<Long> findFollowingIdByMember(Member member) {
		return queryFactory.select(QMember.member.id)
			.from(follow)
			.join(follow.following, QMember.member)
			.where(follow.follower.eq(member))
			.fetch();
	}
}

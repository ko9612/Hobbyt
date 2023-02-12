package com.hobbyt.domain.privatehome.repository;

import static com.hobbyt.domain.member.entity.QMember.*;
import static com.hobbyt.domain.privatehome.entity.QVisit.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.privatehome.entity.Visit;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class CustomVisitRepositoryImpl implements CustomVisitRepository {
	private final JPAQueryFactory queryFactory;

	public Optional<Visit> findTodayVisitByVisitorAndTarget(Member visitor, Member target) {
		// 현재 시간이 아닌 오늘 날짜로 변경
		LocalDate todayDate = LocalDate.now();
		LocalDateTime today = todayDate.atStartOfDay();
		log.info("오늘의 날짜: {}", today);

		Visit found = queryFactory.select(visit)
			.from(visit)
			.join(visit.visitor, member)
			.where(visit.visitor.eq(visitor), visit.target.eq(target),
				visit.modifiedAt.before(today))
			.fetchOne();

		return Optional.ofNullable(found);
	}
}

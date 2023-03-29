package com.hobbyt.domain.privatehome.repository;

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
		LocalDate todayDate = LocalDate.now();
		LocalDateTime today = todayDate.atStartOfDay();

		Visit found = queryFactory.select(visit)
			.from(visit)
			.where(visit.visitor.eq(visitor), visit.target.eq(target),
				visit.modifiedAt.goe(today))
			.fetchOne();

		return Optional.ofNullable(found);
	}

	@Override
	public Long deleteVisitBeforeToday() {
		LocalDate todayDate = LocalDate.now();
		LocalDateTime today = todayDate.atStartOfDay();

		return queryFactory.delete(visit)
			.where(visit.modifiedAt.before(today))
			.execute();
	}
}

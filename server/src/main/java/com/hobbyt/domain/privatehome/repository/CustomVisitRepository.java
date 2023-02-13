package com.hobbyt.domain.privatehome.repository;

import java.util.Optional;

import com.hobbyt.domain.member.entity.Member;
import com.hobbyt.domain.privatehome.entity.Visit;

public interface CustomVisitRepository {
	Optional<Visit> findTodayVisitByVisitorAndTarget(Member visitor, Member target);

	Long deleteVisitBeforeToday();
}

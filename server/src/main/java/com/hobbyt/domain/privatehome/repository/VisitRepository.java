package com.hobbyt.domain.privatehome.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.privatehome.entity.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long>, CustomVisitRepository {
}

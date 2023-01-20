package com.hobbyt.domain.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.sale.entity.SaleTag;

public interface SaleTagRepository extends JpaRepository<SaleTag, Long> {
}

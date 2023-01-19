package com.hobbyt.domain.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.sale.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}

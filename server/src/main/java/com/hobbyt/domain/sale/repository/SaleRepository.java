package com.hobbyt.domain.sale.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hobbyt.domain.sale.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>, CustomSaleRepository {
	@Query("select s from Sale s join fetch s.products where s.id = :id")
	Optional<Sale> findSaleFetchJoinProductBySaleId(@Param("id") Long id);
}

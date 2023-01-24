package com.hobbyt.domain.sale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hobbyt.domain.sale.entity.Product;
import com.hobbyt.domain.sale.entity.Sale;

public interface ProductRepository extends JpaRepository<Product, Long>, CustomProductRepository {
	@Query("select p from Product p join p.sale s where s = :sale")
	public List<Product> findBySaleId(@Param("sale") Sale sale);
}

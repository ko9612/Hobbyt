package com.hobbyt.domain.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hobbyt.domain.sale.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>, CustomProductRepository {
}
